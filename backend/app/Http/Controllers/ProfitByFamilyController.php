<?php

namespace App\Http\Controllers;

use App\Models\ProfitByFamily;
use DB;
use Illuminate\Http\Request;
use stdClass;

class ProfitByFamilyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerProfitByFamily', 'listProfitByFamily', 'listXProfitByFamily', 'deleteProfitByFamily', 'updateProfitByFamily']]);
    }

    public function listProfitByFamily()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = ProfitByFamily::where('status', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = ProfitByFamily::where('status', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = ProfitByFamily::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = ProfitByFamily::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = ProfitByFamily::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = ProfitByFamily::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListProfitByFamily = new stdClass();
        $objContenedorListProfitByFamily->page = $page;
        $objContenedorListProfitByFamily->per_page = $per_page;
        $objContenedorListProfitByFamily->total = $total;
        $objContenedorListProfitByFamily->total_pages = $total_pages;
        $objContenedorListProfitByFamily->data = $data;

        return response()->json($objContenedorListProfitByFamily, 200);
    }

    public function listXProfitByFamily()
    {
        $profit_by_family_id = $_GET["profit_by_family_id"];
        $product_service_type = ProfitByFamily::where('profit_by_family_id', $profit_by_family_id)->first();
        return response()->json($product_service_type, 200);
    }

    public function updateProfitByFamily(Request $request)
    {
        ProfitByFamily::where('profit_by_family_id', $request->profit_by_family_id)
            ->update([
                'family_id' => $request->family_id,
                'category_id' => $request->category_id,
                'coin_id' => $request->coin_id,
                'percentage' => $request->percentage,
            ]);
    }

    public function deleteProfitByFamily(Request $request)
    {
        ProfitByFamily::where('profit_by_family_id', $request->profit_by_family_id)
            ->update([
                'status' => $request->status
            ]);
    }


    public function registerProfitByFamily(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_service_type',
            'status' => 'required|string|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $product_service_type = ProfitByFamily::create([
                'family_id' => $request->family_id,
                'category_id' => $request->category_id,
                'coin_id' => $request->coin_id,
                'percentage' => $request->percentage,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);
        });
    }
}
