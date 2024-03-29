<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'list', 'verifyUser', 'deleteUser','listXUser','updateUser','listSearchUser','updatePersonAndUser']]);
    }

    public function list()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= User::where('user_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = User::where('user_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["user_Name"])){
            $user_Name = $_GET["user_Name"];
            $user_CreationDate = $_GET["user_CreationDate"];
            $user_ApprovedStatus = $_GET["user_ApprovedStatus"];
            $total= User::where('user_StatusID', '=', '1')->where('user_Name','LIKE','%'. $user_Name . '%')->where('user_CreationDate','LIKE','%'. $user_CreationDate . '%')->where('user_ApprovedStatus','LIKE','%'. $user_ApprovedStatus . '%')->count();

            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }
            $data = User::where('user_StatusID', '=', '1')->where('user_Name','LIKE','%'. $user_Name . '%')->where('user_CreationDate','LIKE','%'. $user_CreationDate . '%')->where('user_ApprovedStatus','LIKE','%'. $user_ApprovedStatus . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                $row->auto_increment = $auto_increment + $index + 1;});
        }

        $objContenedorListUser = new \stdClass();
        $objContenedorListUser->page = $page;
        $objContenedorListUser->per_page = $per_page;
        $objContenedorListUser->total = $total;
        $objContenedorListUser->total_pages = $total_pages;
        $objContenedorListUser->data = $data;

        return response()->json($objContenedorListUser, 200);
    }
    public function listXUser()
    {
        $user_ID = $_GET["user_ID"];
        $user = User::where('user_ID', $user_ID)->first();
        return response()->json($user, 200);
    }

    public function listSearchUser(Request $request)
    {
        $user_Name = $_GET["user_Name"];
        $user = User::where('name', 'LIKE', '%' . $user_Name . '%')->first();
        return response()->json($user, 200);
    }


    public function updateUser(Request $request)
    {
        if($request->user_Password == ''){
            User::where('user_ID', $request->user_ID)
                ->update([
                    'user_Name' => $request->user_Name,
                    'user_ApprovedStatus' => $request->user_ApprovedStatus
                ]);
        }else{
            User::where('user_ID', $request->user_ID)
                ->update([
                    'user_Name' => $request->user_Name,
                    'user_ApprovedStatus' => $request->user_ApprovedStatus,
                    'user_Password' => Hash::make($request->user_Password)
                ]);
        }
    }

    public function verifyUser(Request $request)
    {
        User::where('user_ID', $request->user_ID )
            ->update([
                'user_ApprovedStatus' => $request->user_ApprovedStatus
            ]);
    }

    public function deleteUser(Request $request)
    {
        User::where('user_ID', $request->user_ID)
            ->update([
                'user_StatusID' => $request->user_StatusID
            ]);
    }

    public function login(Request $request)
    {
        auth()->shouldUse('api');
        $user = User::where('user_Name', $request->all()['user_Name'])->first();
        // Check Password
        if (!$user || !Hash::check($request->all()['user_Password'], $user->user_Password) || $user->user_ApprovedStatus != 1) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }



    public function register(Request $request)
    {
        $validation = $request->validate([
            'user_Name' => 'required|email|max:255|unique:user',
            'user_Password' => 'required|string|min:6',
            'user_ApprovedStatus' => 'required|string|min:0',
            'user_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
        $person = Person::create([
            'nationality_ID' => '1',
            'ubigeous_PlaceBirth' => '1',
            'ubigeous_Home' => '1',
            'statusmarital_ID' => '1',
            'typedocument_ID' => '1',
            'person_Name' => '$request->person_Name',
            'person_LastNamePaternal' => '$request->person_LastNamePaternal',
            'person_LastNameMaternal' => '$request->person_LastNameMaternal',
            'person_CreationDate' => date('Y-m-d H:i:s'),
            'person_ApprovedStatus' => '1',
            'person_StatusID' => '1'
        ]);
        $user = User::create([
            'person_ID' => '1',//$person->person_ID,
            'role_ID' => 1,
            'user_Name' => $request->user_Name,
            'user_Password' => Hash::make($request->user_Password),
            'user_CreationDate' => date('Y-m-d H:i:s'),
            'user_ApprovedStatus' => $request->user_ApprovedStatus,
            'user_StatusID' => $request->user_StatusID,
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
        });

    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function me()
    {
        $dataUser = Auth::user();
        $person_ID= $dataUser["person_ID"];
        $dataPerson = Person::where('person_ID', $person_ID)->first();

        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'person' => $dataPerson,
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function updatePersonAndUser(Request $request)
    {
        \DB::transaction(function () use ($request) {
            Person::where('person_ID', $request->person_ID)
                ->update([
                    'person_Name' => $request->person_Name,
                    'person_LastNamePaternal' =>$request->person_LastNamePaternal,
                    'person_LastNameMaternal' => $request->person_LastNameMaternal,
                    'person_Email' => $request->person_Email,
                    'person_Direction' => $request->person_Direction,
                    'person_Phone' => $request->person_Phone,
                    'person_CellPhone' => $request->person_CellPhone,
                ]);

            User::where('person_ID', $request->user_ID)
                ->update([
                    'user_Name' => $request->user_Name,
                ]);

        });

    }

}
