<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Maker;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class MakerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerMaker', 'listMaker','listXMaker','deleteMaker','updateMaker']]);
    }

    public function listMaker()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Maker::where('maker_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Maker::where('maker_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["maker_Name"])){
            $maker_Name = $_GET["maker_Name"];
            $maker_CreationDate = $_GET["maker_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($maker_CreationDate != '' || $maker_CreationDate != null){
                $total= Maker::where('maker_StatusID', '=', '1')->where('maker_Name','LIKE','%'. $maker_Name . '%')->where('maker_CreationDate','LIKE','%'. $maker_CreationDate . '%')->count();
                $data = Maker::where('maker_StatusID', '=', '1')->where('maker_Name','LIKE','%'. $maker_Name . '%')->where('maker_CreationDate','LIKE','%'. $maker_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Maker::where('maker_StatusID', '=', '1')->where('maker_Name','LIKE','%'. $maker_Name . '%')->count();
                $data = Maker::where('maker_StatusID', '=', '1')->where('maker_Name','LIKE','%'. $maker_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListMaker = new \stdClass();
        $objContenedorListMaker->page = $page;
        $objContenedorListMaker->per_page = $per_page;
        $objContenedorListMaker->total = $total;
        $objContenedorListMaker->total_pages = $total_pages;
        $objContenedorListMaker->data = $data;

        return response()->json($objContenedorListMaker, 200);
    }

    public function listXMaker()
    {
        $maker_ID = $_GET["maker_ID"];
        $maker = Maker::where('maker_ID', $maker_ID)->first();
        return response()->json($maker, 200);
    }

    public function updateMaker(Request $request)
    {
        if($request->maker_Description == ''){
            Maker::where('maker_ID', $request->maker_ID)
                ->update([
                    'maker_Name' => $request->maker_Name,
                ]);
        }else{
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/maker';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/maker/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/
            Maker::where('maker_ID', $request->maker_ID)
                ->update([
                    'maker_Name' => $request->maker_Name,
                    'maker_Description' => $request->maker_Description,
                    'maker_NameImage' => $routeImg
                ]);
        }
    }

    public function deleteMaker(Request $request)
    {
        Maker::where('maker_ID', $request->maker_ID)
            ->update([
                'maker_StatusID' => $request->maker_StatusID
            ]);
    }


    public function registerMaker(Request $request)
    {
        $request->validate([
            'maker_Name' => 'required|string|max:255|unique:maker',
            'maker_Description' => 'required|string',
            'maker_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/maker';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/maker/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/
        $maker = Maker::create([
            'maker_ID' => 1,
            'maker_Name' => $request->maker_Name,
            'maker_Description' => $request->maker_Description,
            'maker_NameImage' => $routeImg,
            'maker_CreationDate' => date('Y-m-d H:i:s'),
            'maker_StatusID' => $request->maker_StatusID,
        ]);
        });
    }
}
