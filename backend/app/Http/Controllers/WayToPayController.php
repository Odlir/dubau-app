<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\WaytoPay;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class WayToPayController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerWaytoPay', 'listWaytoPay','listXWaytoPay','deleteWaytoPay','updateWaytoPay']]);
    }

    public function listWaytoPay()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= WaytoPay::where('waytopay_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = WaytoPay::where('waytopay_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["waytopay_Name"])){
            $waytopay_Name = $_GET["waytopay_Name"];
            $waytopay_CreationDate = $_GET["waytopay_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($waytopay_CreationDate != '' || $waytopay_CreationDate != null){
                $total= WaytoPay::where('waytopay_StatusID', '=', '1')->where('waytopay_Name','LIKE','%'. $waytopay_Name . '%')->where('waytopay_CreationDate','LIKE','%'. $waytopay_CreationDate . '%')->count();
                $data = WaytoPay::where('waytopay_StatusID', '=', '1')->where('waytopay_Name','LIKE','%'. $waytopay_Name . '%')->where('waytopay_CreationDate','LIKE','%'. $waytopay_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= WaytoPay::where('waytopay_StatusID', '=', '1')->where('waytopay_Name','LIKE','%'. $waytopay_Name . '%')->count();
                $data = WaytoPay::where('waytopay_StatusID', '=', '1')->where('waytopay_Name','LIKE','%'. $waytopay_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListWaytoPay = new \stdClass();
        $objContenedorListWaytoPay->page = $page;
        $objContenedorListWaytoPay->per_page = $per_page;
        $objContenedorListWaytoPay->total = $total;
        $objContenedorListWaytoPay->total_pages = $total_pages;
        $objContenedorListWaytoPay->data = $data;

        return response()->json($objContenedorListWaytoPay, 200);
    }

    public function listXWaytoPay()
    {
        $waytopay_ID = $_GET["waytopay_ID"];
        $waytopay = WaytoPay::where('waytopay_ID', $waytopay_ID)->first();
        return response()->json($waytopay, 200);
    }

    public function updateWaytoPay(Request $request)
    {
        if($request->waytopay_Description == ''){
            WaytoPay::where('waytopay_ID', $request->waytopay_ID)
                ->update([
                    'waytopay_Name' => $request->waytopay_Name,
                ]);
        }else{

            WaytoPay::where('waytopay_ID', $request->waytopay_ID)
                ->update([
                    'waytopay_Name' => $request->waytopay_Name,
                    'waytopay_Description' => $request->waytopay_Description,
                ]);
        }
    }

    public function deleteWaytoPay(Request $request)
    {
        WaytoPay::where('waytopay_ID', $request->waytopay_ID)
            ->update([
                'waytopay_StatusID' => $request->waytopay_StatusID
            ]);
    }


    public function registerWaytoPay(Request $request)
    {
        $request->validate([
            'waytopay_Name' => 'required|string|max:255|unique:waytopay',
            'waytopay_Description' => 'required|string',
            'waytopay_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {

        $waytopay = WaytoPay::create([
            'waytopay_ID' => 1,
            'waytopay_Name' => $request->waytopay_Name,
            'waytopay_Description' => $request->waytopay_Description,
            'waytopay_CreationDate' => date('Y-m-d H:i:s'),
            'waytopay_StatusID' => $request->waytopay_StatusID,
        ]);
        });
    }
}
