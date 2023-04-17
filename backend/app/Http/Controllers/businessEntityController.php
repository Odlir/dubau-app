<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Staff;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class businessEntityController extends Controller
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

        $data = Staff::where('staff_StatusID', '=', '1')->join('person', 'staff.person_ID', '=', 'person.person_ID')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
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

                $data = Staff::where('staff_StatusID', '=', '1')->where('person_Name','LIKE','%'. $person_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
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
            $customer = Customer::create([
                'type_person_id' => $request->type_person_id,
                'company_id' => 0,
                'person_id' => $person->person_ID,
                'category_id' => $request->category_id,
                'waytopay_id' => $request->waytopay_id,
                'credit_line_id' => $request->credit_line_id,
                'created_by' => 'Ivan',
                'created_in' => date('Y-m-d'),
                'status' => 1
            ]);

            $supplier = Supplier::create([
                'type_person_id' => $request->type_person_id,
                'company_id' => 0,
                'person_id' => $person->person_ID,
                'commercial_section' => $person->commercial_section_id,
                'created_by' => 'Ivan',
                'created_in' => date('Y-m-d'),
                'status' => 1
            ]);

            $staff = Staff::create([
                'type_person_id' => $request->type_person_id,
                'company_id' => 0,
                'person_id' => $person->person_ID,
                'commercial_section' => $person->commercial_section_id,
                'created_by' => 'Ivan',
                'created_in' => date('Y-m-d'),
                'status' => 1
            ]);

        });

    }
}
