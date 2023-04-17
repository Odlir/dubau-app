<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Category;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerCategory', 'listCategory','listXCategory','deleteCategory','updateCategory']]);
    }

    public function listCategory()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= Category::where('category_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = Category::where('category_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["category_Name"])){
            $category_Name = $_GET["category_Name"];
            $category_CreationDate = $_GET["category_CreationDate"];

            if($category_CreationDate != '' || $category_CreationDate != null){
                $total= Category::where('category_StatusID', '=', '1')->where('category_Name','LIKE','%'. $category_Name . '%')->where('category_CreationDate','LIKE','%'. $category_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Category::where('category_StatusID', '=', '1')->where('category_Name','LIKE','%'. $category_Name . '%')->where('category_CreationDate','LIKE','%'. $category_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= Category::where('category_StatusID', '=', '1')->where('category_Name','LIKE','%'. $category_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = Category::where('category_StatusID', '=', '1')->where('category_Name','LIKE','%'. $category_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListCategory = new \stdClass();
        $objContenedorListCategory->page = $page;
        $objContenedorListCategory->per_page = $per_page;
        $objContenedorListCategory->total = $total;
        $objContenedorListCategory->total_pages = $total_pages;
        $objContenedorListCategory->data = $data;

        return response()->json($objContenedorListCategory, 200);
    }

    public function listXCategory()
    {
        $category_ID = $_GET["category_ID"];
        $category = Category::where('category_ID', $category_ID)->first();
        return response()->json($category, 200);
    }

    public function updateCategory(Request $request)
    {
        if($request->category_Description == ''){
            Category::where('category_ID', $request->category_ID)
                ->update([
                    'category_Name' => $request->category_Name,
                ]);
        }else{
            Category::where('category_ID', $request->category_ID)
                ->update([
                    'category_Name' => $request->category_Name,
                    'category_Description' => $request->category_Description
                ]);
        }
    }

    public function deleteCategory(Request $request)
    {
        Category::where('category_ID', $request->category_ID)
            ->update([
                'category_StatusID' => $request->category_StatusID
            ]);
    }


    public function registerCategory(Request $request)
    {
        $request->validate([
            'category_Name' => 'required|string|max:255|unique:category',
            'category_Description' => 'required|string',
            'category_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
        $category = Category::create([
            'category_ID' => 1,
            'category_Name' => $request->category_Name,
            'category_Description' => $request->category_Description,
            'category_CreationDate' => date('Y-m-d H:i:s'),
            'category_StatusID' => $request->category_StatusID,
        ]);
        });
    }
}
