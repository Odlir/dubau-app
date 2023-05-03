<?php

namespace App\Http\Controllers;

use App\Models\ProductServiceType;
use DB;
use Illuminate\Http\Request;
use stdClass;

class ProductServiceTypeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerProductServiceType', 'listProductServiceType', 'listXProductServiceType', 'deleteProductServiceType', 'updateProductServiceType']]);
    }

    public function listProductServiceType()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = ProductServiceType::where('status', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = ProductServiceType::where('status', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = ProductServiceType::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = ProductServiceType::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = ProductServiceType::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = ProductServiceType::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListProductServiceType = new stdClass();
        $objContenedorListProductServiceType->page = $page;
        $objContenedorListProductServiceType->per_page = $per_page;
        $objContenedorListProductServiceType->total = $total;
        $objContenedorListProductServiceType->total_pages = $total_pages;
        $objContenedorListProductServiceType->data = $data;

        return response()->json($objContenedorListProductServiceType, 200);
    }

    public function listXProductServiceType()
    {
        $product_service_type_id = $_GET["product_service_type_id"];
        $product_service_type = ProductServiceType::where('product_service_type_id', $product_service_type_id)->first();
        return response()->json($product_service_type, 200);
    }

    public function updateProductServiceType(Request $request)
    {
        if ($request->product_service_type_Description == '') {
            ProductServiceType::where('product_service_type_id', $request->product_service_type_id)
                ->update([
                    'name' => $request->name,
                ]);
        } else {
            ProductServiceType::where('product_service_type_id', $request->product_service_type_id)
                ->update([
                    'name' => $request->name,
                    'type' => $request->type
                ]);
        }
    }

    public function deleteProductServiceType(Request $request)
    {
        ProductServiceType::where('product_service_type_id', $request->product_service_type_id)
            ->update([
                'status' => $request->status
            ]);
    }


    public function registerProductServiceType(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_service_type',
            'status' => 'required|string|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $product_service_type = ProductServiceType::create([
                'product_service_type_id' => 1,
                'name' => $request->name,
                'type' => $request->type,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);
        });
    }
}
