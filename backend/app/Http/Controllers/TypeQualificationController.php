<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\TypeQualification;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class TypeQualificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerTypeQualification', 'listTypeQualification','listXTypeQualification','deleteTypeQualification','updateTypeQualification']]);
    }

    public function listTypeQualification()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= TypeQualification::where('typequalification_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = TypeQualification::where('typequalification_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["typequalification_Name"])){
            $typequalification_Name = $_GET["typequalification_Name"];
            $typequalification_CreationDate = $_GET["typequalification_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($typequalification_CreationDate != '' || $typequalification_CreationDate != null){
                $total= TypeQualification::where('typequalification_StatusID', '=', '1')->where('typequalification_Name','LIKE','%'. $typequalification_Name . '%')->where('typequalification_CreationDate','LIKE','%'. $typequalification_CreationDate . '%')->count();
                $data = TypeQualification::where('typequalification_StatusID', '=', '1')->where('typequalification_Name','LIKE','%'. $typequalification_Name . '%')->where('typequalification_CreationDate','LIKE','%'. $typequalification_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= TypeQualification::where('typequalification_StatusID', '=', '1')->where('typequalification_Name','LIKE','%'. $typequalification_Name . '%')->count();
                $data = TypeQualification::where('typequalification_StatusID', '=', '1')->where('typequalification_Name','LIKE','%'. $typequalification_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListTypeQualification = new \stdClass();
        $objContenedorListTypeQualification->page = $page;
        $objContenedorListTypeQualification->per_page = $per_page;
        $objContenedorListTypeQualification->total = $total;
        $objContenedorListTypeQualification->total_pages = $total_pages;
        $objContenedorListTypeQualification->data = $data;

        return response()->json($objContenedorListTypeQualification, 200);
    }

    public function listXTypeQualification()
    {
        $typequalification_ID = $_GET["typequalification_ID"];
        $typequalification = TypeQualification::where('typequalification_ID', $typequalification_ID)->first();
        return response()->json($typequalification, 200);
    }

    public function updateTypeQualification(Request $request)
    {
        if($request->typequalification_Description == ''){
            TypeQualification::where('typequalification_ID', $request->typequalification_ID)
                ->update([
                    'typequalification_Name' => $request->typequalification_Name,
                ]);
        }else{
            TypeQualification::where('typequalification_ID', $request->typequalification_ID)
                ->update([
                    'typequalification_Name' => $request->typequalification_Name,
                    'typequalification_Description' => $request->typequalification_Description,
                ]);
        }
    }

    public function deleteTypeQualification(Request $request)
    {
        TypeQualification::where('typequalification_ID', $request->typequalification_ID)
            ->update([
                'typequalification_StatusID' => $request->typequalification_StatusID
            ]);
    }


    public function registerTypeQualification(Request $request)
    {
        $request->validate([
            'typequalification_Name' => 'required|string|max:255|unique:typequalification',
            'typequalification_Description' => 'required|string',
            'typequalification_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {

        $typequalification = TypeQualification::create([
            'typequalification_ID' => 1,
            'typequalification_Name' => $request->typequalification_Name,
            'typequalification_Description' => $request->typequalification_Description,
            'typequalification_CreationDate' => date('Y-m-d H:i:s'),
            'typequalification_StatusID' => $request->typequalification_StatusID,
        ]);
        });
    }
}
