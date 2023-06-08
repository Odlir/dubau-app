<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff3;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class Staff3Controller extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerStaff3', 'listStaff3','listXStaff3','deleteStaff3','updateStaff3']]);
    }

    public function listStaff3()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Staff3::where('staff3_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Staff3::where('staff3_StatusID', '=', '1')->join('person', 'staff3.person_ID', '=', 'person.person_ID')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["person_Name"])){
            $person_Name = $_GET["person_Name"];
            $staff3_CreationDate = $_GET["staff3_CreationDate"];

            if($staff3_CreationDate != '' || $staff3_CreationDate != null){
                $total= Staff3::where('staff3_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->where('staff3_CreationDate','LIKE','%'. $staff3_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff3::where('staff3_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->where('staff3_CreationDate','LIKE','%'. $staff3_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Staff3::where('staff3_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff3::where('staff3_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListStaff3 = new \stdClass();
        $objContenedorListStaff3->page = $page;
        $objContenedorListStaff3->per_page = $per_page;
        $objContenedorListStaff3->total = $total;
        $objContenedorListStaff3->total_pages = $total_pages;
        $objContenedorListStaff3->data = $data;

        return response()->json($objContenedorListStaff3, 200);
    }

    public function listXStaff3()
    {
        $staff3_ID = $_GET["staff3_ID"];
        $staff3 = Staff3::where('staff3_ID', $staff3_ID)->first();
        return response()->json($staff3, 200);
    }

    public function updateStaff3(Request $request)
    {
        if($request->staff3_ContractNumber == ''){
            Staff3::where('staff3_ID', $request->staff3_ID)
                ->update([
                    'staff3_StartDate' => $request->staff3_StartDate,
                ]);
        }else{
            Staff3::where('staff3_ID', $request->staff3_ID)
                ->update([
                    'staff3_Name' => $request->staff3_Name,
                    'staff3_StartDate' => $request->staff3_StartDate,
                    'staff3_finalDate' => $request->staff3_finalDate,
                    'staff3_ContractNumber' => $request->staff3_ContractNumber
                ]);
        }
    }

    public function deleteStaff3(Request $request)
    {
        Staff3::where('staff3_ID', $request->staff3_ID)
            ->update([
                'staff3_StatusID' => $request->staff3_StatusID
            ]);
    }


    public function registerStaff3(Request $request)
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
            $staff3 = Staff3::create([
                'person_ID' => $person->person_ID,
                'position_ID' => $request->position_ID,
                'staff3_StartDate' => $request->staff3_StartDate,
                'staff3_FinalDate' => $request->staff3_FinalDate,
                'staff3_ContractNumber' => $request->staff3_ContractNumber,
                'staff3_CreationDate' => date('Y-m-d H:i:s'),
                'staff3_StatusID' => '1',
            ]);
        });
    }
}
