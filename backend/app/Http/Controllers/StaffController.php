<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerStaff', 'listStaff','listXStaff','deleteStaff','updateStaff']]);
    }

    public function listStaff()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Staff::where('staff_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Staff::where('staff_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["person_Name"])){
            $person_Name = $_GET["person_Name"];
            $staff_CreationDate = $_GET["staff_CreationDate"];

            if($staff_CreationDate != '' || $staff_CreationDate != null){
                $total= Staff::where('staff_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->where('staff_CreationDate','LIKE','%'. $staff_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff::where('staff_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->where('staff_CreationDate','LIKE','%'. $staff_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Staff::where('staff_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff::where('staff_StatusID', '=', '1')->where('staff_Name','LIKE','%'. $person_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListStaff = new \stdClass();
        $objContenedorListStaff->page = $page;
        $objContenedorListStaff->per_page = $per_page;
        $objContenedorListStaff->total = $total;
        $objContenedorListStaff->total_pages = $total_pages;
        $objContenedorListStaff->data = $data;

        return response()->json($objContenedorListStaff, 200);
    }

    public function listXStaff()
    {
        $staff_ID = $_GET["staff_ID"];
        $staff = Staff::where('staff_ID', $staff_ID)->first();
        return response()->json($staff, 200);
    }

    public function updateStaff(Request $request)
    {
        if($request->staff_ContractNumber == ''){
            Staff::where('staff_ID', $request->staff_ID)
                ->update([
                    'staff_StartDate' => $request->staff_StartDate,
                ]);
        }else{
            Staff::where('staff_ID', $request->staff_ID)
                ->update([
                    'staff_Name' => $request->staff_Name,
                    'staff_StartDate' => $request->staff_StartDate,
                    'staff_finalDate' => $request->staff_finalDate,
                    'staff_ContractNumber' => $request->staff_ContractNumber
                ]);
        }
    }

    public function deleteStaff(Request $request)
    {
        Staff::where('staff_ID', $request->staff_ID)
            ->update([
                'staff_StatusID' => $request->staff_StatusID
            ]);
    }


    public function registerStaff(Request $request)
    {
        $request->validate([
            'person_Name' => 'required|string|max:255',
            'person_LastNamePaternal' => 'required|string|min:2',
            'person_LastNameMaternal' => 'required|string|min:2',
            'staff_StatusID' => 'required|string|min:1',
        ]);


        \DB::transaction(function () use ($request) {
            $person = Person::create([
                'nationality_ID' => '1',
                'ubigeous_PlaceBirth' => '1',
                'ubigeous_Home' => '1',
                'statusmarital_ID' => '1',
                'typedocument_ID' => '1',
                'person_Name' => $request->person_Name,
                'person_LastNamePaternal' => $request->person_LastNamePaternal,
                'person_LastNameMaternal' => $request->person_LastNameMaternal,
                'person_CreationDate' => date('Y-m-d H:i:s'),
                'person_ApprovedStatus' => '1',
                'person_StatusID' => '1'
            ]);
            $user = User::create([
                'person_ID' => $person->person_ID,
                'position_ID' => $person->position_ID,
                'staff_StartDate' => $request->staff_StartDate,
                'staff_FinalDate' => $request->staff_FinalDate,
                'staff_ContractNumber' => $request->staff_ContractNumber,
                'staff_CreationDate' => date('Y-m-d H:i:s'),
                'staff_ApprovedStatus' => $request->staff_ApprovedStatus,
                'staff_StatusID' => '1',
            ]);

        });

    }
}
