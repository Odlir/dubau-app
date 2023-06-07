<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Position;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class PositionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerPosition', 'listPosition','listXPosition','deletePosition','updatePosition']]);
    }

    public function listPosition()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Position::where('position_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Position::where('position_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["position_Name"])){
            $position_Name = $_GET["position_Name"];
            $position_CreationDate = $_GET["position_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if($position_CreationDate != '' || $position_CreationDate != null){
                $total= Position::where('position_StatusID', '=', '1')->where('position_Name','LIKE','%'. $position_Name . '%')->where('position_CreationDate','LIKE','%'. $position_CreationDate . '%')->count();
                $data = Position::where('position_StatusID', '=', '1')->where('position_Name','LIKE','%'. $position_Name . '%')->where('position_CreationDate','LIKE','%'. $position_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Position::where('position_StatusID', '=', '1')->where('position_Name','LIKE','%'. $position_Name . '%')->count();
                $data = Position::where('position_StatusID', '=', '1')->where('position_Name','LIKE','%'. $position_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListPosition = new \stdClass();
        $objContenedorListPosition->page = $page;
        $objContenedorListPosition->per_page = $per_page;
        $objContenedorListPosition->total = $total;
        $objContenedorListPosition->total_pages = $total_pages;
        $objContenedorListPosition->data = $data;

        return response()->json($objContenedorListPosition, 200);
    }

    public function listXPosition()
    {
        $position_ID = $_GET["position_ID"];
        $position = Position::where('position_ID', $position_ID)->first();
        return response()->json($position, 200);
    }

    public function updatePosition(Request $request)
    {
        if($request->position_Description == ''){
            Position::where('position_ID', $request->position_ID)
                ->update([
                    'position_Name' => $request->position_Name,
                ]);
        }else{
            Position::where('position_ID', $request->position_ID)
                ->update([
                    'position_Name' => $request->position_Name,
                    'position_Description' => $request->position_Description,
                ]);
        }
    }

    public function deletePosition(Request $request)
    {
        Position::where('position_ID', $request->position_ID)
            ->update([
                'position_StatusID' => $request->position_StatusID
            ]);
    }


    public function registerPosition(Request $request)
    {
        $request->validate([
            'position_Name' => 'required|string|max:255|unique:position',
            'position_Description' => 'required|string',
            'position_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {

        $position = Position::create([
            'position_ID' => 1,
            'position_Name' => $request->position_Name,
            'position_Description' => $request->position_Description,
            'position_CreationDate' => date('Y-m-d H:i:s'),
            'position_StatusID' => $request->position_StatusID,
        ]);
        });
    }
}
