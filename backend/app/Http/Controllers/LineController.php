<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Line;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class LineController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerLine', 'listLine','listXLine','deleteLine','updateLine']]);
    }

    public function listLine()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Line::where('line_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Line::where('line_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["line_Name"])){
            $line_Name = $_GET["line_Name"];
            $line_CreationDate = $_GET["line_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($line_CreationDate != '' || $line_CreationDate != null){
                $total= Line::where('line_StatusID', '=', '1')->where('line_Name','LIKE','%'. $line_Name . '%')->where('line_CreationDate','LIKE','%'. $line_CreationDate . '%')->count();
                $data = Line::where('line_StatusID', '=', '1')->where('line_Name','LIKE','%'. $line_Name . '%')->where('line_CreationDate','LIKE','%'. $line_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Line::where('line_StatusID', '=', '1')->where('line_Name','LIKE','%'. $line_Name . '%')->count();
                $data = Line::where('line_StatusID', '=', '1')->where('line_Name','LIKE','%'. $line_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListLine = new \stdClass();
        $objContenedorListLine->page = $page;
        $objContenedorListLine->per_page = $per_page;
        $objContenedorListLine->total = $total;
        $objContenedorListLine->total_pages = $total_pages;
        $objContenedorListLine->data = $data;

        return response()->json($objContenedorListLine, 200);
    }

    public function listXLine()
    {
        $line_ID = $_GET["line_ID"];
        $line = Line::where('line_ID', $line_ID)->first();
        return response()->json($line, 200);
    }

    public function updateLine(Request $request)
    {
        if($request->line_Description == ''){
            Line::where('line_ID', $request->line_ID)
                ->update([
                    'line_Name' => $request->line_Name,
                ]);
        }else{
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/line';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/line/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/
            Line::where('line_ID', $request->line_ID)
                ->update([
                    'line_Name' => $request->line_Name,
                    'line_Description' => $request->line_Description,
                    'line_NameImage' => $routeImg
                ]);
        }
    }

    public function deleteLine(Request $request)
    {
        Line::where('line_ID', $request->line_ID)
            ->update([
                'line_StatusID' => $request->line_StatusID
            ]);
    }


    public function registerLine(Request $request)
    {
        $request->validate([
            'line_Name' => 'required|string|max:255|unique:line',
            'line_Description' => 'required|string',
            'line_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/line';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/line/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/
        $line = Line::create([
            'line_ID' => 1,
            'line_Name' => $request->line_Name,
            'line_Description' => $request->line_Description,
            'line_NameImage' => $routeImg,
            'line_CreationDate' => date('Y-m-d H:i:s'),
            'line_StatusID' => $request->line_StatusID,
        ]);
        });
    }
}
