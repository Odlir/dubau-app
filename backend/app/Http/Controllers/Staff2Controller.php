<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff2;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class Staff2Controller extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerStaff2', 'listStaff2','listXStaff2','deleteStaff2','updateStaff2']]);
    }

    public function listStaff2()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Staff2::where('staff2_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Staff2::where('staff2_StatusID', '=', '1')->join('person', 'staff2.person_ID', '=', 'person.person_ID')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["person_Name"])){
            $person_Name = $_GET["person_Name"];
            $staff2_CreationDate = $_GET["staff2_CreationDate"];

            if($staff2_CreationDate != '' || $staff2_CreationDate != null){
                $total= Staff2::where('staff2_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->where('staff2_CreationDate','LIKE','%'. $staff2_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff2::where('staff2_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->where('staff2_CreationDate','LIKE','%'. $staff2_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Staff2::where('staff2_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff2::where('staff2_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListStaff2 = new \stdClass();
        $objContenedorListStaff2->page = $page;
        $objContenedorListStaff2->per_page = $per_page;
        $objContenedorListStaff2->total = $total;
        $objContenedorListStaff2->total_pages = $total_pages;
        $objContenedorListStaff2->data = $data;

        return response()->json($objContenedorListStaff2, 200);
    }

    public function listXStaff2()
    {
        $staff2_ID = $_GET["staff2_ID"];
        $staff2 = Staff2::where('staff2_ID', $staff2_ID)->first();
        return response()->json($staff2, 200);
    }

    public function updateStaff2(Request $request)
    {
        if($request->staff2_ContractNumber == ''){
            Staff2::where('staff2_ID', $request->staff2_ID)
                ->update([
                    'staff2_StartDate' => $request->staff2_StartDate,
                ]);
        }else{
            Staff2::where('staff2_ID', $request->staff2_ID)
                ->update([
                    'staff2_Name' => $request->staff2_Name,
                    'staff2_StartDate' => $request->staff2_StartDate,
                    'staff2_finalDate' => $request->staff2_finalDate,
                    'staff2_ContractNumber' => $request->staff2_ContractNumber
                ]);
        }
    }

    public function deleteStaff2(Request $request)
    {
        Staff2::where('staff2_ID', $request->staff2_ID)
            ->update([
                'staff2_StatusID' => $request->staff2_StatusID
            ]);
    }


    public function registerStaff2(Request $request)
    {
        $request->validate([
            'person_Name' => 'required|string|max:255',
            'person_LastNamePaternal' => 'required|string|min:1',
            'person_LastNameMaternal' => 'required|string|min:1',
            'person_DateBirth' => 'required|string|min:1',
            'person_Direction' => 'required|string|min:1',
            'person_Phone' => 'required|string|min:1',
            'person_CellPhone' => 'required|string|min:1',
            'person_Email' => 'required|string|min:1',
            'person_WebSite' => 'required|string|min:1',
        ]);


        \DB::transaction(function () use ($request) {
            $person = Person::create([
                'nationality_ID' => $request->nationality_ID,
                'ubigeous_Home' => $request->ubigeous_Home,
                'ubigeous_PlaceBirth' => $request->ubigeous_PlaceBirth,
                'statusmarital_ID' => $request->statusmarital_ID,
                'typedocument_ID' =>'1',
                'person_DNI' => $request->numberDocument,
                'person_Gender' => $request->person_Gender,
                'person_LastNamePaternal' => $request->person_LastNamePaternal,
                'person_LastNameMaternal' => $request->person_LastNameMaternal,
                'person_DateBirth' => $request->person_DateBirth,
                'person_Direction' => $request->person_Direction,
                'person_Phone' => $request->person_Phone,
                'person_CellPhone' => $request->person_CellPhone,
                'person_Email' => $request->person_Email,
                'person_WebSite' => $request->person_WebSite,
                'person_CreationDate' => date('Y-m-d H:i:s'),
                'person_StatusID' => '1'
            ]);
            $staff2 = Staff2::create([
                'person_ID' => $person->person_ID,
                'position_ID' => $request->position_ID,
                'staff2_StartDate' => $request->staff2_StartDate,
                'staff2_FinalDate' => $request->staff2_FinalDate,
                'staff2_ContractNumber' => $request->staff2_ContractNumber,
                'staff2_CreationDate' => date('Y-m-d H:i:s'),
                'staff2_StatusID' => '1',
            ]);

        });

    }
}
