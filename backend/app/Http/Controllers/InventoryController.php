<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use DB;
use Illuminate\Http\Request;
use stdClass;

class InventoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerInventory', 'listInventory', 'listXInventory', 'deleteInventory', 'updateInventory']]);
    }

    public function listInventory()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = Inventory::where('status', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Inventory::where('status', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = Inventory::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Inventory::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = Inventory::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Inventory::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListInventory = new stdClass();
        $objContenedorListInventory->page = $page;
        $objContenedorListInventory->per_page = $per_page;
        $objContenedorListInventory->total = $total;
        $objContenedorListInventory->total_pages = $total_pages;
        $objContenedorListInventory->data = $data;

        return response()->json($objContenedorListInventory, 200);
    }

    public function listXInventory()
    {
        $inventory_id = $_GET["inventory_id"];
        $inventory = Inventory::where('inventory_id', $inventory_id)->first();
        return response()->json($inventory, 200);
    }

    public function updateInventory(Request $request)
    {

        Inventory::where('inventory_id', $request->inventory_id)
            ->update([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'final_date' => $request->final_date,
            ]);

    }

    public function deleteInventory(Request $request)
    {
        Inventory::where('inventory_id', $request->inventory_id)
            ->update([
                'status' => $request->status
            ]);
    }


    public function registerInventory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:inventory',
            'status' => 'required|string|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $inventory = Inventory::create([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'final_date' => $request->final_date,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);
        });
    }
}
