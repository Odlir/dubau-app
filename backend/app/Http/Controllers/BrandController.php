<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Brand;
use App\Models\Person;
use Illuminate\Support\Facades\DB;
use File;

class BrandController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerBrand', 'listBrand', 'listXBrand', 'deleteBrand', 'updateBrand', 'uploadfileBrand']]);
    }

    public function listBrand()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total = Brand::where('brand_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Brand::where('brand_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if (isset($_GET["brand_Name"])) {
            $brand_Name = $_GET["brand_Name"];
            $brand_CreationDate = $_GET["brand_CreationDate"];
            $total_pages = $total / $per_page;
            if ($page == 1) {
                $auto_increment = 0;
            } else {
                $auto_increment = ($page - 1) * $per_page;
            }

            if ($brand_CreationDate != '' || $brand_CreationDate != null) {
                $total = Brand::where('brand_StatusID', '=', '1')->where('brand_Name', 'LIKE', '%' . $brand_Name . '%')->where('brand_CreationDate', 'LIKE', '%' . $brand_CreationDate . '%')->count();
                $data = Brand::where('brand_StatusID', '=', '1')->where('brand_Name', 'LIKE', '%' . $brand_Name . '%')->where('brand_CreationDate', 'LIKE', '%' . $brand_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            } else {
                $total = Brand::where('brand_StatusID', '=', '1')->where('brand_Name', 'LIKE', '%' . $brand_Name . '%')->count();
                $data = Brand::where('brand_StatusID', '=', '1')->where('brand_Name', 'LIKE', '%' . $brand_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;
                });
            }
        }

        $objContenedorListBrand = new \stdClass();
        $objContenedorListBrand->page = $page;
        $objContenedorListBrand->per_page = $per_page;
        $objContenedorListBrand->total = $total;
        $objContenedorListBrand->total_pages = $total_pages;
        $objContenedorListBrand->data = $data;

        return response()->json($objContenedorListBrand, 200);
    }

    public function listXBrand()
    {
        $brand_ID = $_GET["brand_ID"];
        $brand = Brand::where('brand_ID', $brand_ID)->first();
        return response()->json($brand, 200);
    }

    public function updateBrand(Request $request)
    {
        if ($request->brand_Description == '') {
            Brand::where('brand_ID', $request->brand_ID)
                ->update([
                    'brand_Name' => $request->brand_Name,
                ]);
        } else {
            Brand::where('brand_ID', $request->brand_ID)
                ->update([
                    'brand_Name' => $request->brand_Name,
                    'brand_Description' => $request->brand_Description
                ]);
        }
    }

    public function deleteBrand(Request $request)
    {
        Brand::where('brand_ID', $request->brand_ID)
            ->update([
                'brand_StatusID' => $request->brand_StatusID
            ]);
    }


    public function registerBrand(Request $request)
    {
        $request->validate([
            'brand_Name' => 'required|string|max:255|unique:brand',
            'brand_Description' => 'required|string',
            'brand_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
            /*Image upload*/
            $routeImg = '';
            $files = $request->img;
            $routeDestination ='images/brand';
            if ($request->hasFile('img')) {
                foreach ($files as $file) {
                    $file_name = $file->getClientOriginalName();
                    $routeImg = 'images/brand/' . $file_name;
                    $file->move($routeDestination, $file_name);
                }
            }

            /*Image upload*/

            $brand = Brand::create([
                'brand_ID' => 1,
                'brand_Name' => $request->brand_Name,
                'brand_Description' => $request->brand_Description,
                'brand_CreationDate' => date('Y-m-d H:i:s'),
                'brand_NameImage' =>$routeImg,
                'brand_StatusID' => $request->brand_StatusID,
            ]);
        });
    }

    public function uploadfileBrand(Request $request)
    {
        $files = $request->img;
        $routeDestination = public_path() . '/images/brand';
        //Verify
        if ($request->hasFile('img')) {
            foreach ($files as $file) {
                $file_name = $file->getClientOriginalName();
                $file->move($routeDestination, $file_name);
            }
        }
    }
}
