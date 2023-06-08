<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Area;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class AreaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerArea', 'listArea','listXArea','deleteArea','updateArea']]);
    }

    public function listArea()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Area::where('area_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Area::where('area_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["area_Name"])){
            $area_Name = $_GET["area_Name"];
            $area_CreationDate = $_GET["area_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($area_CreationDate != '' || $area_CreationDate != null){
                $total= Area::where('area_StatusID', '=', '1')->where('area_Name','LIKE','%'. $area_Name . '%')->where('area_CreationDate','LIKE','%'. $area_CreationDate . '%')->count();
                $data = Area::where('area_StatusID', '=', '1')->where('area_Name','LIKE','%'. $area_Name . '%')->where('area_CreationDate','LIKE','%'. $area_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Area::where('area_StatusID', '=', '1')->where('area_Name','LIKE','%'. $area_Name . '%')->count();
                $data = Area::where('area_StatusID', '=', '1')->where('area_Name','LIKE','%'. $area_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListArea = new \stdClass();
        $objContenedorListArea->page = $page;
        $objContenedorListArea->per_page = $per_page;
        $objContenedorListArea->total = $total;
        $objContenedorListArea->total_pages = $total_pages;
        $objContenedorListArea->data = $data;

        return response()->json($objContenedorListArea, 200);
    }

    public function listXArea()
    {
        $area_ID = $_GET["area_ID"];
        $area = Area::where('area_ID', $area_ID)->first();
        return response()->json($area, 200);
    }

    public function updateArea(Request $request)
    {
        if($request->area_Description == ''){
            Area::where('area_ID', $request->area_ID)
                ->update([
                    'area_Name' => $request->area_Name,
                ]);
        }else{
            Area::where('area_ID', $request->area_ID)
                ->update([
                    'area_Name' => $request->area_Name,
                    'area_Description' => $request->area_Description
                ]);
        }
    }

    public function deleteArea(Request $request)
    {
        Area::where('area_ID', $request->area_ID)
            ->update([
                'area_StatusID' => $request->area_StatusID
            ]);
    }


    public function registerArea(Request $request)
    {
        $request->validate([
            'area_Name' => 'required|string|max:255|unique:area',
            'area_Description' => 'required|string',
            'area_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
        $area = Area::create([
            'area_ID' => 1,
            'area_Name' => $request->area_Name,
            'area_Description' => $request->area_Description,
            'area_CreationDate' => date('Y-m-d H:i:s'),
            'area_StatusID' => $request->area_StatusID,
        ]);
        });
    }
}
