<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerRole', 'listRole','listXRole','deleteRole','updateRole']]);
    }

    public function listRole()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Role::where('role_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Role::where('role_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["role_Name"])){
            $role_Name = $_GET["role_Name"];
            $role_CreationDate = $_GET["role_CreationDate"];

            if($role_CreationDate != '' || $role_CreationDate != null){
                $total= Role::where('role_StatusID', '=', '1')->where('role_Name','LIKE','%'. $role_Name . '%')->where('role_CreationDate','LIKE','%'. $role_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Role::where('role_StatusID', '=', '1')->where('role_Name','LIKE','%'. $role_Name . '%')->where('role_CreationDate','LIKE','%'. $role_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Role::where('role_StatusID', '=', '1')->where('role_Name','LIKE','%'. $role_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Role::where('role_StatusID', '=', '1')->where('role_Name','LIKE','%'. $role_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListRole = new \stdClass();
        $objContenedorListRole->page = $page;
        $objContenedorListRole->per_page = $per_page;
        $objContenedorListRole->total = $total;
        $objContenedorListRole->total_pages = $total_pages;
        $objContenedorListRole->data = $data;

        return response()->json($objContenedorListRole, 200);
    }

    public function listXRole()
    {
        $role_ID = $_GET["role_ID"];
        $role = Role::where('role_ID', $role_ID)->first();
        return response()->json($role, 200);
    }

    public function updateRole(Request $request)
    {
        if($request->role_Description == ''){
            Role::where('role_ID', $request->role_ID)
                ->update([
                    'role_Name' => $request->role_Name,
                ]);
        }else{
            Role::where('role_ID', $request->role_ID)
                ->update([
                    'role_Name' => $request->role_Name,
                    'role_Description' => $request->role_Description
                ]);
        }
    }

    public function deleteRole(Request $request)
    {
        Role::where('role_ID', $request->role_ID)
            ->update([
                'role_StatusID' => $request->role_StatusID
            ]);
    }


    public function registerRole(Request $request)
    {
        $request->validate([
            'role_Name' => 'required|string|max:255|unique:role',
            'role_Description' => 'required|string',
            'role_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
        $role = Role::create([
            'role_ID' => 1,
            'role_Name' => $request->role_Name,
            'role_Description' => $request->role_Description,
            'role_CreationDate' => date('Y-m-d H:i:s'),
            'role_StatusID' => $request->role_StatusID,
        ]);
        });
    }
}
