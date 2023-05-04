<?php

namespace App\Http\Controllers;

use App\Models\Family;
use App\Models\ProfitByFamily;
use DB;
use Illuminate\Http\Request;
use stdClass;

class FamilyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerFamily', 'listFamily', 'listXFamily', 'deleteFamily', 'updateFamily']]);
    }

    public function listFamily()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = Family::where('status', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Family::where('status', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["name"])) {
            $name = $_GET["name"];
            $created_in = $_GET["created_in"];

            if ($created_in != '' || $created_in != null) {
                $total = Family::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Family::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->where('created_in', 'LIKE', '%' . $created_in . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = Family::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Family::where('status', '=', '1')->where('name', 'LIKE', '%' . $name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListFamily = new stdClass();
        $objContenedorListFamily->page = $page;
        $objContenedorListFamily->per_page = $per_page;
        $objContenedorListFamily->total = $total;
        $objContenedorListFamily->total_pages = $total_pages;
        $objContenedorListFamily->data = $data;

        return response()->json($objContenedorListFamily, 200);
    }

    public function listXFamily()
    {
        $family_id = $_GET["family_id"];
        $product_service_type = Family::where('family_id', $family_id)->first();
        return response()->json($product_service_type, 200);
    }


    public function updateFamily(Request $request)
    {
        Family::where('family_id', $request->family_id)
            ->update([
                'name' => $request->name,
                'internal_code' => $request->internal_code,
                'user_code' => $request->user_code,
                'percentage' => $request->percentage,
                'type' => $request->type,

            ]);
    }

    public function deleteFamily(Request $request)
    {
        Family::where('family_id', $request->family_id)
            ->update([
                'status' => $request->status
            ]);
    }


    public function registerFamily(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_service_type',
            'status' => 'required|string|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $family = Family::create([
                'name' => $request->name,
                'internal_code' => $request->internal_code,
                'user_code' => $request->user_code,
                'percentage' => $request->percentage,
                'type' => $request->type,
                'created_in' => date('Y-m-d H:i:s'),
                'status' => $request->status,
            ]);

            $profitByFamilyContainer = $request->profitByFamilyData;
            foreach ($profitByFamilyContainer as $profitByFamily) {

                $profitByFamily_SolId = ProfitByFamily::create([
                    'family_id' => $family->family_id,
                    'category_id' => $profitByFamily['id'],
                    'coin_id' => 0,
                    'percentage' => $profitByFamily['coinSol'],
                    'created_in' => date('Y-m-d H:i:s'),
                    'status' => $request->status,
                ]);
                $profitByFamily_DollarId = ProfitByFamily::create([
                    'family_id' => $family->family_id,
                    'category_id' => $profitByFamily['id'],
                    'coin_id' => 1,
                    'percentage' => $profitByFamily['coinDollar'],
                    'created_in' => date('Y-m-d H:i:s'),
                    'status' => $request->status,
                ]);
            }

        });

    }
}
