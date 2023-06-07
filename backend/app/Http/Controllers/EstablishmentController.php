<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Establishment;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class EstablishmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerEstablishment', 'listEstablishment','listXEstablishment','deleteEstablishment','updateEstablishment']]);
    }

    public function listEstablishment()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Establishment::where('establishment_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Establishment::where('establishment_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["establishment_Name"])){
            $establishment_Name = $_GET["establishment_Name"];
            $establishment_CreationDate = $_GET["establishment_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($establishment_CreationDate != '' || $establishment_CreationDate != null){
                $total= Establishment::where('establishment_StatusID', '=', '1')->where('establishment_Name','LIKE','%'. $establishment_Name . '%')->where('establishment_CreationDate','LIKE','%'. $establishment_CreationDate . '%')->count();
                $data = Establishment::where('establishment_StatusID', '=', '1')->where('establishment_Name','LIKE','%'. $establishment_Name . '%')->where('establishment_CreationDate','LIKE','%'. $establishment_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Establishment::where('establishment_StatusID', '=', '1')->where('establishment_Name','LIKE','%'. $establishment_Name . '%')->count();
                $data = Establishment::where('establishment_StatusID', '=', '1')->where('establishment_Name','LIKE','%'. $establishment_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListEstablishment = new \stdClass();
        $objContenedorListEstablishment->page = $page;
        $objContenedorListEstablishment->per_page = $per_page;
        $objContenedorListEstablishment->total = $total;
        $objContenedorListEstablishment->total_pages = $total_pages;
        $objContenedorListEstablishment->data = $data;

        return response()->json($objContenedorListEstablishment, 200);
    }

    public function listXEstablishment()
    {
        $establishment_ID = $_GET["establishment_ID"];
        $establishment = Establishment::where('establishment_ID', $establishment_ID)->first();
        return response()->json($establishment, 200);
    }

    public function updateEstablishment(Request $request)
    {
        if($request->establishment_Description == ''){
            Establishment::where('establishment_ID', $request->establishment_ID)
                ->update([
                    'establishment_Name' => $request->establishment_Name,
                ]);
        }else{
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/establishment';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/establishment/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/
            Establishment::where('establishment_ID', $request->establishment_ID)
                ->update([
                    'establishment_Name' => $request->establishment_Name,
                    'establishment_Description' => $request->establishment_Description,
                    'establishment_NameImage' => $routeImg
                ]);
        }
    }

    public function deleteEstablishment(Request $request)
    {
        Establishment::where('establishment_ID', $request->establishment_ID)
            ->update([
                'establishment_StatusID' => $request->establishment_StatusID
            ]);
    }


    public function registerEstablishment(Request $request)
    {
        $request->validate([
            'establishment_Name' => 'required|string|max:255|unique:establishment',
            'establishment_Description' => 'required|string',
            'establishment_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/establishment';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/establishment/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/
        $establishment = Establishment::create([
            'establishment_ID' => 1,
            'establishment_Name' => $request->establishment_Name,
            'establishment_Description' => $request->establishment_Description,
            'establishment_NameImage' => $routeImg,
            'establishment_CreationDate' => date('Y-m-d H:i:s'),
            'establishment_StatusID' => $request->establishment_StatusID,
        ]);
        });
    }
}
