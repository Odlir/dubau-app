<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Family;
use App\Models\InventoryDetail;
use App\Models\Line;
use App\Models\Maker;
use App\Models\Product;
use App\Models\ProductServiceType;
use App\Models\ProfitByProduct;
use App\Models\UnitMeasure;
use DB;
use Illuminate\Http\Request;
use stdClass;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerProduct', 'listProduct', 'listXProduct', 'deleteProduct', 'updateProduct', 'listFamilys', 'listProductServiceTypes', 'listBrands', 'listLines', 'listMakers', 'listUnitOfMeasurement']]);
    }

    public function listProduct()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];
        $type = $_GET["type"];

        $total = Product::where('status', '=', '1')->where('product.type', '=', "'$type'")->count();

        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Product::where('product.status', '=', '1')->where('product.type', '=', $type)->join('family', 'product.family_id', '=', 'family.family_id', 'left')->selectRaw('product.*, family.name AS familyName')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = Product::where('product.status', '=', '1')->where('product.type', '=', $type)->join('family', 'product.family_id', '=', 'family.family_id', 'left')->selectRaw('product.*,family.name AS familyName')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Product::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = Product::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Product::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListProduct = new stdClass();
        $objContenedorListProduct->page = $page;
        $objContenedorListProduct->per_page = $per_page;
        $objContenedorListProduct->total = $total;
        $objContenedorListProduct->total_pages = $total_pages;
        $objContenedorListProduct->data = $data;

        return response()->json($objContenedorListProduct, 200);
    }

    public function listXProduct()
    {
        $product_id = $_GET["product_id"];
        $product = Product::where('product_id', $product_id)->first();
        return response()->json($product, 200);
    }

    public function listFamilys(Request $request)
    {
        $typeDocument = Family::all();
        return response()->json($typeDocument, 200);
    }

    public function listProductServiceTypes(Request $request)
    {
        $type = $_GET["type"];
        $typeDocument = ProductServiceType::where('type', '=', $type)->get();
        return response()->json($typeDocument, 200);
    }

    public function listBrands(Request $request)
    {
        $typeDocument = Brand::all();
        return response()->json($typeDocument, 200);
    }

    public function listLines(Request $request)
    {
        $typeDocument = Line::all();
        return response()->json($typeDocument, 200);
    }

    public function listMakers(Request $request)
    {
        $typeDocument = Maker::all();
        return response()->json($typeDocument, 200);
    }

    public function listUnitOfMeasurement(Request $request)
    {
        $typeDocument = UnitMeasure::all();
        return response()->json($typeDocument, 200);
    }


    public function updateProduct(Request $request)
    {

        DB::transaction(function () use ($request) {
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination = 'images/line';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/line/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/

            Product::where('product_id', $request->product_id)
                ->update([
                    'family_id' => $request->family_id,
                    'product_service_type_id' => $request->product_service_type_id,
                    'brand_id' => $request->brand_id,
                    'line_id' => $request->line_id,
                    'maker_id' => $request->maker_id,
                    'unit_of_measurement_id' => $request->unit_of_measurement_id,
                    'name' => $request->name,
                    'type' => $request->type,
                    'description' => $request->description,
                    'comment' => $request->comment,
                    'model' => $request->model,
                    'image' => $routeImg,
                    'minimun_stock' => $request->minimun_stock,
                    'maximun_stock' => $request->maximun_stock,
                    'internal_code' => $request->internal_code,
                    'original_code' => $request->original_code,
                    'user_code' => $request->user_code,
                    'cost' => $request->cost,
                    'status_dinamic' => $request->status_dinamic,
                    'created_in' => date('Y-m-d H:i:s'),
                    'status' => $request->status,
                ]);

        });
    }

    public function deleteProduct(Request $request)
    {
        Product::where('product_id', $request->product_id)
            ->update([
                'status' => $request->status
            ]);
    }


    public function registerProduct(Request $request)
    {


        DB::transaction(function () use ($request) {
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination = 'images/line';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/line/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }
            /*Image upload*/

            $product = Product::create([
                'family_id' => $request->family_id,
                'product_service_type_id' => $request->product_service_type_id,
                'brand_id' => $request->brand_id,
                'line_id' => $request->line_id,
                'maker_id' => $request->maker_id,
                'unit_of_measurement_id' => $request->unit_of_measurement_id,

                'name' => $request->name,
                'type' => $request->type,
                'description' => $request->description,
                'comment' => $request->comment,
                'model' => $request->model,
                'image' => $routeImg,
                'minimun_stock' => $request->minimun_stock,
                'maximun_stock' => $request->maximun_stock,
                'internal_code' => $request->internal_code,
                'original_code' => $request->original_code,
                'user_code' => $request->user_code,
                'cost' => $request->cost,
                'status_dinamic' => $request->status_dinamic,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);

            $inventory_detail = InventoryDetail::create([
                'inventory_id' => 1,
                'product_id' => $product->product_id,
                'amount' => 0,
                'cost' => 0,
                'status_dinamic' => 0,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => 1,
            ]);
        });

    }
}
