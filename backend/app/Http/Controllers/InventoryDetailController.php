<?php

namespace App\Http\Controllers;

use App\Models\InventoryDetail;
use App\Models\Product;
use DB;
use Illuminate\Http\Request;
use stdClass;

class InventoryDetailController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' =>
            ['registerInventoryDetail',
                'listInventoryDetail',
                'listXInventoryDetail',
                'deleteInventoryDetail',
                'updateInventoryDetail',
                'listProducts'
            ]]);
    }

    public function listInventoryDetail()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];
        $inventory_id = $_GET["inventory_id"];

        $total = InventoryDetail::where('status', '=', '1')->where('inventory_id', '=', "'$inventory_id'")->count();

        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->selectRaw('product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->selectRaw('product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->selectRaw('product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = InventoryDetail::where('status', '=', '1')->where('inventory_id', '=', "'$inventory_id'")->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = InventoryDetail::where('status', '=', '1')->where('inventory_id', '=', "'$inventory_id'")->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
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

        DB::transaction(function () use ($request) {
            $inventory_detail = InventoryDetail::create([
                'inventory_id' => $request->inventoryXDetail,
                'product_id' => $request->productId,
                'amount' => $request->quantity,
                'cost' => $request->price,
                'status_dinamic' => 0,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);
        });
    }

    public function listProducts(Request $request)
    {
        $productName = $request->productName;
        $typeDocument = Product::where('name', 'LIKE', "%$productName%")->get();
        return response()->json($typeDocument, 200);
    }
}
