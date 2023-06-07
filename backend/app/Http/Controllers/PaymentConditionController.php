<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\PaymentCondition;
use App\Models\Person;
use Illuminate\Support\Facades\DB;

class PaymentConditionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerPaymentCondition', 'listPaymentCondition','listXPaymentCondition','deletePaymentCondition','updatePaymentCondition']]);
    }

    public function listPaymentCondition()
    {
        $page = $_GET["page"];
        $per_page = $_GET["per_page"];

        $total= PaymentCondition::where('payment_condition_StatusID', '=', '1')->count();
        $total_pages = $total / $per_page;
        if ($page == 1) {
            $auto_increment = 0;
        } else {
            $auto_increment = ($page - 1) * $per_page;
        }

        $data = PaymentCondition::where('payment_condition_StatusID', '=', '1')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
            $row->auto_increment = $auto_increment + $index + 1;
        });

        if(isset($_GET["payment_condition_Name"])){
            $payment_condition_Name = $_GET["payment_condition_Name"];
            $payment_condition_CreationDate = $_GET["payment_condition_CreationDate"];

            if($payment_condition_CreationDate != '' || $payment_condition_CreationDate != null){
                $total= PaymentCondition::where('payment_condition_StatusID', '=', '1')->where('payment_condition_Name','LIKE','%'. $payment_condition_Name . '%')->where('payment_condition_CreationDate','LIKE','%'. $payment_condition_CreationDate . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = PaymentCondition::where('payment_condition_StatusID', '=', '1')->where('payment_condition_Name','LIKE','%'. $payment_condition_Name . '%')->where('payment_condition_CreationDate','LIKE','%'. $payment_condition_CreationDate . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }else{
                $total= PaymentCondition::where('payment_condition_StatusID', '=', '1')->where('payment_condition_Name','LIKE','%'. $payment_condition_Name . '%')->count();
                $total_pages = $total / $per_page;
                if ($page == 1) {
                    $auto_increment = 0;
                } else {
                    $auto_increment = ($page - 1) * $per_page;
                }

                $data = PaymentCondition::where('payment_condition_StatusID', '=', '1')->where('payment_condition_Name','LIKE','%'. $payment_condition_Name . '%')->paginate($per_page)->each(function ($row, $index) use ($auto_increment) {
                    $row->auto_increment = $auto_increment + $index + 1;});
            }
        }

        $objContenedorListPaymentCondition = new \stdClass();
        $objContenedorListPaymentCondition->page = $page;
        $objContenedorListPaymentCondition->per_page = $per_page;
        $objContenedorListPaymentCondition->total = $total;
        $objContenedorListPaymentCondition->total_pages = $total_pages;
        $objContenedorListPaymentCondition->data = $data;

        return response()->json($objContenedorListPaymentCondition, 200);
    }

    public function listXPaymentCondition()
    {
        $payment_condition_ID = $_GET["payment_condition_ID"];
        $payment_condition = PaymentCondition::where('payment_condition_ID', $payment_condition_ID)->first();
        return response()->json($payment_condition, 200);
    }

    public function updatePaymentCondition(Request $request)
    {
        if($request->payment_condition_Description == ''){
            PaymentCondition::where('payment_condition_ID', $request->payment_condition_ID)
                ->update([
                    'payment_condition_Name' => $request->payment_condition_Name,
                ]);
        }else{
            PaymentCondition::where('payment_condition_ID', $request->payment_condition_ID)
                ->update([
                    'payment_condition_Name' => $request->payment_condition_Name,
                    'payment_condition_Description' => $request->payment_condition_Description
                ]);
        }
    }

    public function deletePaymentCondition(Request $request)
    {
        PaymentCondition::where('payment_condition_ID', $request->payment_condition_ID)
            ->update([
                'payment_condition_StatusID' => $request->payment_condition_StatusID
            ]);
    }


    public function registerPaymentCondition(Request $request)
    {
        $request->validate([
            'payment_condition_Name' => 'required|string|max:255|unique:payment_condition',
            'payment_condition_Description' => 'required|string',
            'payment_condition_StatusID' => 'required|string|min:1',
        ]);

        \DB::transaction(function () use ($request) {
        $payment_condition = PaymentCondition::create([
            'payment_condition_ID' => 1,
            'payment_condition_Name' => $request->payment_condition_Name,
            'payment_condition_Description' => $request->payment_condition_Description,
            'payment_condition_CreationDate' => date('Y-m-d H:i:s'),
            'payment_condition_StatusID' => $request->payment_condition_StatusID,
        ]);
        });
    }
}
