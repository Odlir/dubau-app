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
                'listProducts',
                'activeInventoryDetail',
                'listInventoryFamilyDetail'
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

        $data = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->join('family', 'product.family_id', '=', 'family.family_id')->selectRaw('family.name as family_name,product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->orderByDesc('inventory_detail.inventory_detail_id')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->join('family', 'product.family_id', '=', 'family.family_id')->selectRaw('family.name as family_name,product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->where('created_in', 'LIKE', '%' . $created_in . '%')->orderByDesc('inventory_detail.inventory_detail_id')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->join('family', 'product.family_id', '=', 'family.family_id')->selectRaw('family.name as family_name,product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->orderByDesc('inventory_detail.inventory_detail_id')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
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

                $data = InventoryDetail::where('status', '=', '1')->where('inventory_id', '=', "'$inventory_id'")->orderByDesc('inventory_detail.inventory_detail_id')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
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
        $inventory_detail = InventoryDetail::where('inventory_detail.inventory_detail_id', $inventory_detail_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->selectRaw('product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->first();
        return response()->json($inventory_detail, 200);
    }

    public function updateInventoryDetail(Request $request)
    {

        InventoryDetail::where('inventory_detail_id', $request->inventory_detail_id)
            ->update([
                'inventory_id' => $request->inventoryXDetail,
                'product_id' => $request->productId,
                'amount' => $request->quantity,
                'cost' => $request->price,
                'status_dinamic' => 0,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
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
            $productId = InventoryDetail::where('product_id', '=', $request->productId)->where('status', '=', 1)->first();
            if ($productId === null) {
                $inventory_detail = InventoryDetail::create([
                    'inventory_id' => $request->inventoryXDetail,
                    'product_id' => $request->productId,
                    'amount' => $request->quantity,
                    'cost' => $request->price,
                    'status_dinamic' => 0,
                    'created_in' => date('Y-m-d H:i:s'),
                    'status' => $request->status,
                ]);
            } else {
                InventoryDetail::where('inventory_id', $request->inventoryXDetail)->where('product_id', '=', $request->productId)->where('status', '=', 1)
                    ->update([
                        'amount' => $request->quantity,
                        'cost' => $request->price,
                        'status_dinamic' => 0,
                        'updated_in' => date('Y-m-d H:i:s'),
                        'status' => $request->status,
                    ]);
            }
        });

    }

    public function listProducts(Request $request)
    {
        $productName = $request->productName;
        $typeDocument = Product::where('name', 'LIKE', "%$productName%")->where('status', '=', '1')->get();
        return response()->json($typeDocument, 200);
    }


    public function activeInventoryDetail(Request $request)
    {
        InventoryDetail::where('inventory_detail_id', $request->dataInventoryId)
            ->update([
                'status_dinamic' => 1,
                'updated_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);
    }


    public function listInventoryFamilyDetail()
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

        $data = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->join('family', 'product.family_id', '=', 'family.family_id')->selectRaw('family.name as family_name,product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->orderByDesc('inventory_detail.inventory_detail_id')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->join('family', 'product.family_id', '=', 'family.family_id')->selectRaw('family.name as family_name,product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->where('created_in', 'LIKE', '%' . $created_in . '%')->orderByDesc('inventory_detail.inventory_detail_id')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = InventoryDetail::where('inventory_detail.status', '=', '1')->where('inventory_detail.inventory_id', '=', $inventory_id)->join('product', 'inventory_detail.product_id', '=', 'product.product_id')->join('family', 'product.family_id', '=', 'family.family_id')->selectRaw('family.name as family_name,product.*,inventory_detail.*, inventory_detail.cost AS inventoryDetailCost')->orderByDesc('inventory_detail.inventory_detail_id')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
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

                $data = InventoryDetail::where('status', '=', '1')->where('inventory_id', '=', "'$inventory_id'")->orderByDesc('inventory_detail.inventory_detail_id')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $containerFamily = array();
        $i = 0;
        foreach ($data as $inventory_product) {
            $containerFamilyName = $inventory_product->family_name;
            if (array_key_exists($containerFamilyName, $containerFamily)) {
                $containerFamily[$containerFamilyName][] = $inventory_product;
            } else {
                $containerFamily[$containerFamilyName] = [$inventory_product];
            }
            $i++;
        }

        $objContenedorListInventoryDetail = new stdClass();
        $objContenedorListInventoryDetail->page = $page;
        $objContenedorListInventoryDetail->per_page = $per_page;
        $objContenedorListInventoryDetail->total = $total;
        $objContenedorListInventoryDetail->total_pages = $total_pages;
        $objContenedorListInventoryDetail->data = $containerFamily;

        return response()->json($objContenedorListInventoryDetail, 200);
    }
}
