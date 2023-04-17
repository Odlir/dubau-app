<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\CommercialSection;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class CommercialSectionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerCommercialSection', 'listCommercialSection','listXCommercialSection','deleteCommercialSection','updateCommercialSection']]);
    }

    public function listCommercialSection()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= CommercialSection::where('commercial_section_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = CommercialSection::where('commercial_section_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["commercial_section_Name"])){
            $commercial_section_Name = $_GET["commercial_section_Name"];
            $commercial_section_CreationDate = $_GET["commercial_section_CreationDate"];

            if($commercial_section_CreationDate != '' || $commercial_section_CreationDate != null){
                $total= CommercialSection::where('commercial_section_StatusID', '=', '1')->where('commercial_section_Name','LIKE','%'. $commercial_section_Name . '%')->where('commercial_section_CreationDate','LIKE','%'. $commercial_section_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = CommercialSection::where('commercial_section_StatusID', '=', '1')->where('commercial_section_Name','LIKE','%'. $commercial_section_Name . '%')->where('commercial_section_CreationDate','LIKE','%'. $commercial_section_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= CommercialSection::where('commercial_section_StatusID', '=', '1')->where('commercial_section_Name','LIKE','%'. $commercial_section_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = CommercialSection::where('commercial_section_StatusID', '=', '1')->where('commercial_section_Name','LIKE','%'. $commercial_section_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListCommercialSection = new \stdClass();
        $objContenedorListCommercialSection->page = $page;
        $objContenedorListCommercialSection->per_page = $per_page;
        $objContenedorListCommercialSection->total = $total;
        $objContenedorListCommercialSection->total_pages = $total_pages;
        $objContenedorListCommercialSection->data = $data;

        return response()->json($objContenedorListCommercialSection, 200);
    }

    public function listXCommercialSection()
    {
        $commercial_section_ID = $_GET["commercial_section_ID"];
        $commercial_section = CommercialSection::where('commercial_section_ID', $commercial_section_ID)->first();
        return response()->json($commercial_section, 200);
    }

    public function updateCommercialSection(Request $request)
    {
        if($request->commercial_section_Description == ''){
            CommercialSection::where('commercial_section_ID', $request->commercial_section_ID)
                ->update([
                    'commercial_section_Name' => $request->commercial_section_Name,
                ]);
        }else{
            CommercialSection::where('commercial_section_ID', $request->commercial_section_ID)
                ->update([
                    'commercial_section_Name' => $request->commercial_section_Name,
                    'commercial_section_Description' => $request->commercial_section_Description
                ]);
        }
    }

    public function deleteCommercialSection(Request $request)
    {
        CommercialSection::where('commercial_section_ID', $request->commercial_section_ID)
            ->update([
                'commercial_section_StatusID' => $request->commercial_section_StatusID
            ]);
    }


    public function registerCommercialSection(Request $request)
    {
        $request->validate([
            'commercial_section_Name' => 'required|string|max:255|unique:commercial_section',
            'commercial_section_Description' => 'required|string',
            'commercial_section_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
        $commercial_section = CommercialSection::create([
            'commercial_section_ID' => 1,
            'commercial_section_Name' => $request->commercial_section_Name,
            'commercial_section_Description' => $request->commercial_section_Description,
            'commercial_section_CreationDate' => date('Y-m-d H:i:s'),
            'commercial_section_StatusID' => $request->commercial_section_StatusID,
        ]);
        });
    }
}
