<?php

namespace App\Http\Controllers;

use App\Models\InventoryDetail;
use DB;
use Illuminate\Http\Request;
use stdClass;

class InventoryDetailController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerInventoryDetail', 'listInventoryDetail', 'listXInventoryDetail', 'deleteInventoryDetail', 'updateInventoryDetail']]);
    }

    public function listInventoryDetail()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = InventoryDetail::where('status', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = InventoryDetail::where('status', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = InventoryDetail::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = InventoryDetail::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = InventoryDetail::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = InventoryDetail::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListInventoryDetail = new stdClass();
        $objContenedorListInventoryDetail->page = $page;
        $objContenedorListInventoryDetail->per_page = $per_page;
        $objContenedorListInventoryDetail->total = $total;
        $objContenedorListInventoryDetail->total_pages = $total_pages;
        $objContenedorListInventoryDetail->data = $data;

        return response()->json($objContenedorListInventoryDetail, 200);
    }

    public function listXInventoryDetail()
    {
        $inventory_detail_id = $_GET["inventory_detail_id"];
        $inventory_detail = InventoryDetail::where('inventory_detail_id', $inventory_detail_id)->first();
        return response()->json($inventory_detail, 200);
    }

    public function updateInventoryDetail(Request $request)
    {

        InventoryDetail::where('inventory_detail_id', $request->inventory_detail_id)
            ->update([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'final_date' => $request->final_date,
            ]);

    }

    public function deleteInventoryDetail(Request $request)
    {
        InventoryDetail::where('inventory_detail_id', $request->inventory_detail_id)
            ->update([
                'status' => $request->status
            ]);
    }


    public function registerInventoryDetail(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:inventory_detail',
            'status' => 'required|string|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $inventory_detail = InventoryDetail::create([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'final_date' => $request->final_date,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);
        });
    }
}
