<?php

namespace App\Http\Controllers;

use App\Models\BusinessEntity;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Nationality;
use App\Models\PaymentCondition;
use App\Models\Person;
use App\Models\Staff;
use App\Models\TypeDocument;
use App\Models\TypeQualification;
use App\Models\WayToPay;
use DB;
use Illuminate\Http\Request;
use stdClass;

class businessEntityController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerBusinessEntity', 'listBusinessEntity', 'listXBusinessEntity', 'deleteBusinessEntity', 'updateBusinessEntity', 'listNationality', 'listTypeDocument', 'listTypeQualification', 'listCategorys', 'listWaytoPays', 'listPaymentConditions']]);
    }

    public function listBusinessEntity()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = Staff::where('staff_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = BusinessEntity::where('business_entity.status', '=', '1')
            ->join('customer', 'business_entity.customer_id', '=', 'customer.customer_id')
            ->join('person', 'person.person_id', '=', 'customer.person_ID')
            ->paginate($per_page)
            ->each(function ($row, $index) use ($auto_increment) {
                $row->auto_increment = $auto_increment + $index + 1;
            });

        if (isset($_GET["person_Name"])) {
            $person_Name = $_GET["person_Name"];
            $staff_CreationDate = $_GET["staff_CreationDate"];

            if ($staff_CreationDate != '' || $staff_CreationDate != null) {
                $total = Staff::where('staff_StatusID', '=', '1')->where('person_Name', 'LIKE', '%' . $person_Name . '%')->where('staff_CreationDate', 'LIKE', '%' . $staff_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff::where('staff_StatusID', '=', '1')->where('person_Name', 'LIKE', '%' . $person_Name . '%')->where('staff_CreationDate', 'LIKE', '%' . $staff_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = Staff::where('staff_StatusID', '=', '1')->where('person_Name', 'LIKE', '%' . $person_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Staff::where('staff_StatusID', '=', '1')->where('person_Name', 'LIKE', '%' . $person_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListStaff = new stdClass();
        $objContenedorListStaff->page = $page;
        $objContenedorListStaff->per_page = $per_page;
        $objContenedorListStaff->total = $total;
        $objContenedorListStaff->total_pages = $total_pages;
        $objContenedorListStaff->data = $data;

        return response()->json($objContenedorListStaff, 200);
    }

    public function listXBusinessEntity(Request $request)
    {
        $business_entity_id = $request->business_entity_id;

        $business_entity = BusinessEntity::where('business_entity_id', $business_entity_id)->join('customer', 'business_entity.customer_id', '=', 'customer.customer_id')->join('person', 'person.person_id', '=', 'customer.person_ID')->first();
        return response()->json($business_entity, 200);
    }

    public function listNationality(Request $request)
    {
        $nationality = Nationality::all();
        return response()->json($nationality, 200);
    }


    public function listTypeDocument(Request $request)
    {
        $typeDocument = TypeDocument::all();
        return response()->json($typeDocument, 200);
    }

    public function listTypeQualification(Request $request)
    {
        $typeDocument = TypeQualification::all();
        return response()->json($typeDocument, 200);
    }

    public function listCategorys(Request $request)
    {
        $typeDocument = Category::all();
        return response()->json($typeDocument, 200);
    }

    public function listWaytoPays(Request $request)
    {
        $typeDocument = WayToPay::all();
        return response()->json($typeDocument, 200);
    }

    public function listPaymentConditions(Request $request)
    {
        $typeDocument = PaymentCondition::all();
        return response()->json($typeDocument, 200);
    }
    
    public function updateBusinessEntity(Request $request)
    {
        DB::transaction(function () use ($request) {
            /* Staff::where('staff_id', $request->staff_id)
                 ->update([
                     'position_ID' => $request->position_ID,
                     'staff_StartDate' => $request->staff_StartDate,
                     'staff_FinalDate' => $request->staff_FinalDate,
                     'staff_ContractNumber' => $request->staff_ContractNumber,
                     'staff_CreationDate' => date('Y-m-d H:i:s'),
                     'staff_StatusID' => '1',
                 ]);*/

            /*            Customer::where('customer_id', $request->customer_id)
                            ->update([
                                'customer_id' => $request->customer_id,
                                'type_person_id' => $request->type_person_id,
                                'category_id' => $request->category_id,
                                'waytopay_id' => $request->waytopay_id,
                            ]);*/
            Person::where('person_ID', $request->person_ID)
                ->update([
                    'nationality_ID' => $request->nationality_ID,
                    'ubigeous_Home' => 10101,
                    'ubigeous_PlaceBirth' => 10101,
                    'statusmarital_ID' => $request->statusmarital_ID,
                    'typedocument_ID' => 1,
                    'person_DNI' => $request->person_DNI,
                    'person_Gender' => $request->person_Gender,
                    'person_Name' => $request->person_Name,
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
        });
    }

    public function deleteBusinessEntity(Request $request)
    {
        BusinessEntity::where('business_entity_id', $request->business_entity_id)
            ->update([
                'status' => 0
            ]);
    }


    public function registerBusinessEntity(Request $request)
    {
        /*           $request->validate([
                    'person_Name' => 'required|string|max:255',
                    'person_LastNamePaternal' => 'required|string|min:1',
                    'person_LastNameMaternal' => 'required|string|min:1',
                    'person_DateBirth' => 'required|string|min:1',
                    'person_Direction' => 'required|string|min:1',
                    'person_Phone' => 'required|string|min:1',
                    'person_CellPhone' => 'required|string|min:1',
                    'person_Email' => 'required|string|min:1',
                    'person_WebSite' => 'required|string|min:1',
                ]);*/

        DB::transaction(function () use ($request) {
            $person = Person::create([
                'nationality_ID' => $request->nationality_ID,
                'ubigeous_Home' => 10101,
                'ubigeous_PlaceBirth' => 10101,
                'statusmarital_ID' => $request->statusmarital_ID,
                'typedocument_ID' => 1,
                'person_DNI' => $request->person_DNI,
                'person_Gender' => $request->person_Gender,
                'person_Name' => $request->person_Name,
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
                'type_person_id' => '1',
                'company_id' => 0,
                'person_id' => $person->person_ID,
                'category_id' => 0,
                'waytopay_id' => 0,
                'credit_line_id' => 1000,
                'created_by' => 1,
                'created_in' => date('Y-m-d'),
                'status' => 1
            ]);

            /*   $supplier = Supplier::create([
                   'type_person_id' => $request->type_person_id,
                   'company_id' => 0,
                   'person_id' => $person->person_ID,
                   'commercial_section' => $person->commercial_section_id,
                   'created_by' => 'Ivan',
                   'created_in' => date('Y-m-d'),
                   'status' => 1
               ]);

               $staff = Staff::create([
                   'person_ID' => $person->person_ID,
                   'position_ID' => $request->position_ID,
                   'staff_StartDate' => $request->staff_StartDate,
                   'staff_FinalDate' => $request->staff_FinalDate,
                   'staff_ContractNumber' => $request->staff_ContractNumber,
                   'staff_CreationDate' => date('Y-m-d H:i:s'),
                   'staff_StatusID' => '1',
               ]);*/

            BusinessEntity::create([
                'customer_id' => $customer->customer_id,
                'supplier_id' => 0,
                'staff_id' => 0,
                'created_by' => 'Ivan',
                'created_in' => date('Y-m-d H:i:s'),
                'status_dinamic' => '1',
                'status' => '1',
            ]);
        });

    }
}
