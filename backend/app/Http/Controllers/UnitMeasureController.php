<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\UnitMeasure;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class UnitMeasureController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerUnitMeasure', 'listUnitMeasure','listXUnitMeasure','deleteUnitMeasure','updateUnitMeasure']]);
    }

    public function listUnitMeasure()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= UnitMeasure::where('unitmeasure_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = UnitMeasure::where('unitmeasure_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["unitmeasure_Name"])){
            $unitmeasure_Name = $_GET["unitmeasure_Name"];
            $unitmeasure_CreationDate = $_GET["unitmeasure_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($unitmeasure_CreationDate != '' || $unitmeasure_CreationDate != null){
                $total= UnitMeasure::where('unitmeasure_StatusID', '=', '1')->where('unitmeasure_Name','LIKE','%'. $unitmeasure_Name . '%')->where('unitmeasure_CreationDate','LIKE','%'. $unitmeasure_CreationDate . '%')->count();
                $data = UnitMeasure::where('unitmeasure_StatusID', '=', '1')->where('unitmeasure_Name','LIKE','%'. $unitmeasure_Name . '%')->where('unitmeasure_CreationDate','LIKE','%'. $unitmeasure_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= UnitMeasure::where('unitmeasure_StatusID', '=', '1')->where('unitmeasure_Name','LIKE','%'. $unitmeasure_Name . '%')->count();
                $data = UnitMeasure::where('unitmeasure_StatusID', '=', '1')->where('unitmeasure_Name','LIKE','%'. $unitmeasure_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListUnitMeasure = new \stdClass();
        $objContenedorListUnitMeasure->page = $page;
        $objContenedorListUnitMeasure->per_page = $per_page;
        $objContenedorListUnitMeasure->total = $total;
        $objContenedorListUnitMeasure->total_pages = $total_pages;
        $objContenedorListUnitMeasure->data = $data;

        return response()->json($objContenedorListUnitMeasure, 200);
    }

    public function listXUnitMeasure()
    {
        $unitmeasure_ID = $_GET["unitmeasure_ID"];
        $unitmeasure = UnitMeasure::where('unitmeasure_ID', $unitmeasure_ID)->first();
        return response()->json($unitmeasure, 200);
    }

    public function updateUnitMeasure(Request $request)
    {
        if($request->unitmeasure_Description == ''){
            UnitMeasure::where('unitmeasure_ID', $request->unitmeasure_ID)
                ->update([
                    'unitmeasure_Name' => $request->unitmeasure_Name,
                ]);
        }else{
            UnitMeasure::where('unitmeasure_ID', $request->unitmeasure_ID)
                ->update([
                    'unitmeasure_Name' => $request->unitmeasure_Name,
                    'unitmeasure_Description' => $request->unitmeasure_Description
                ]);
        }
    }

    public function deleteUnitMeasure(Request $request)
    {
        UnitMeasure::where('unitmeasure_ID', $request->unitmeasure_ID)
            ->update([
                'unitmeasure_StatusID' => $request->unitmeasure_StatusID
            ]);
    }


    public function registerUnitMeasure(Request $request)
    {
        $request->validate([
            'unitmeasure_Name' => 'required|string|max:255|unique:unitmeasure',
            'unitmeasure_Description' => 'required|string',
            'unitmeasure_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {

        $unitmeasure = UnitMeasure::create([
            'unitmeasure_ID' => 1,
            'unitmeasure_Name' => $request->unitmeasure_Name,
            'unitmeasure_Description' => $request->unitmeasure_Description,
            'unitmeasure_CreationDate' => date('Y-m-d H:i:s'),
            'unitmeasure_StatusID' => $request->unitmeasure_StatusID,
        ]);
        });
    }
}
