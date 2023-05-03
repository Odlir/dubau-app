<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\businessEntityController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommercialSectionController;
use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\FamilyController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\LineController;
use App\Http\Controllers\MakerController;
use App\Http\Controllers\PaymentConditionController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\ProductServiceTypeController;
use App\Http\Controllers\ProfitByFamilyController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\TypeQualificationController;
use App\Http\Controllers\UnitMeasureController;
use App\Http\Controllers\WayToPayController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return 'Hello World';
});

Route::get('/testsss', function () {
    return 'Hello Worlda';
})->middleware('auth');

Route::get('/login', function () {
    return 'Debe Loguearse';
})->name('login');

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
    Route::get('ruta', 'ruta');
    Route::get('list', 'list');
    Route::post('verifyUser', 'verifyUser');
    Route::post('deleteUser', 'deleteUser');
    Route::get('listXUser', 'listXUser');
    Route::post('updateUser', 'updateUser');
    Route::post('updatePersonAndUser', 'updatePersonAndUser');
    Route::get('listSearchUsuario', 'listSearchUsuario');
});

Route::controller(RoleController::class)->group(function () {
    Route::post('loginRole', 'loginRole');
    Route::post('registerRole', 'registerRole');
    Route::get('listRole', 'listRole');
    Route::get('listXRole', 'listXRole');
    Route::post('deleteRole', 'deleteRole');
    Route::post('updateRole', 'updateRole');
});

Route::controller(BrandController::class)->group(function () {
    Route::post('loginBrand', 'loginBrand');
    Route::post('registerBrand', 'registerBrand');
    Route::get('listBrand', 'listBrand');
    Route::get('listXBrand', 'listXBrand');
    Route::post('deleteBrand', 'deleteBrand');
    Route::post('updateBrand', 'updateBrand');
    Route::post('uploadfileBrand', 'uploadfileBrand');
});

Route::controller(AreaController::class)->group(function () {
    Route::post('loginArea', 'loginArea');
    Route::post('registerArea', 'registerArea');
    Route::get('listArea', 'listArea');
    Route::get('listXArea', 'listXArea');
    Route::post('deleteArea', 'deleteArea');
    Route::post('updateArea', 'updateArea');
});

Route::controller(LineController::class)->group(function () {
    Route::post('loginLine', 'loginLine');
    Route::post('registerLine', 'registerLine');
    Route::get('listLine', 'listLine');
    Route::get('listXLine', 'listXLine');
    Route::post('deleteLine', 'deleteLine');
    Route::post('updateLine', 'updateLine');
});

Route::controller(MakerController::class)->group(function () {
    Route::post('loginMaker', 'loginMaker');
    Route::post('registerMaker', 'registerMaker');
    Route::get('listMaker', 'listMaker');
    Route::get('listXMaker', 'listXMaker');
    Route::post('deleteMaker', 'deleteMaker');
    Route::post('updateMaker', 'updateMaker');
});

Route::controller(WayToPayController::class)->group(function () {
    Route::post('loginWaytoPay', 'loginWaytoPay');
    Route::post('registerWaytoPay', 'registerWaytoPay');
    Route::get('listWaytoPay', 'listWaytoPay');
    Route::get('listXWaytoPay', 'listXWaytoPay');
    Route::post('deleteWaytoPay', 'deleteWaytoPay');
    Route::post('updateWaytoPay', 'updateWaytoPay');
});

Route::controller(EstablishmentController::class)->group(function () {
    Route::post('loginEstablishment', 'loginEstablishment');
    Route::post('registerEstablishment', 'registerEstablishment');
    Route::get('listEstablishment', 'listEstablishment');
    Route::get('listXEstablishment', 'listXEstablishment');
    Route::post('deleteEstablishment', 'deleteEstablishment');
    Route::post('updateEstablishment', 'updateEstablishment');
});

Route::controller(TypeQualificationController::class)->group(function () {
    Route::post('loginTypeQualification', 'loginTypeQualification');
    Route::post('registerTypeQualification', 'registerTypeQualification');
    Route::get('listTypeQualification', 'listTypeQualification');
    Route::get('listXTypeQualification', 'listXTypeQualification');
    Route::post('deleteTypeQualification', 'deleteTypeQualification');
    Route::post('updateTypeQualification', 'updateTypeQualification');
});

Route::controller(UnitMeasureController::class)->group(function () {
    Route::post('loginUnitMeasure', 'loginUnitMeasure');
    Route::post('registerUnitMeasure', 'registerUnitMeasure');
    Route::get('listUnitMeasure', 'listUnitMeasure');
    Route::get('listXUnitMeasure', 'listXUnitMeasure');
    Route::post('deleteUnitMeasure', 'deleteUnitMeasure');
    Route::post('updateUnitMeasure', 'updateUnitMeasure');
});
Route::controller(PositionController::class)->group(function () {
    Route::post('loginPosition', 'loginPosition');
    Route::post('registerPosition', 'registerPosition');
    Route::get('listPosition', 'listPosition');
    Route::get('listXPosition', 'listXPosition');
    Route::post('deletePosition', 'deletePosition');
    Route::post('updatePosition', 'updatePosition');
});
Route::controller(StaffController::class)->group(function () {
    Route::post('loginStaff', 'loginStaff');
    Route::post('registerStaff', 'registerStaff');
    Route::get('listStaff', 'listStaff');
    Route::get('listXStaff', 'listXStaff');
    Route::post('deleteStaff', 'deleteStaff');
    Route::post('updateStaff', 'updateStaff');
});

Route::controller(StaffController::class)->group(function () {
    Route::post('loginStaff2', 'loginStaff2');
    Route::post('registerStaff2', 'registerStaff2');
    Route::get('listStaff2', 'listStaff2');
    Route::get('listXStaff2', 'listXStaff2');
    Route::post('deleteStaff2', 'deleteStaff2');
    Route::post('updateStaff2', 'updateStaff2');
});

Route::controller(StaffController::class)->group(function () {
    Route::post('loginStaff3', 'loginStaff3');
    Route::post('registerStaff3', 'registerStaff3');
    Route::get('listStaff3', 'listStaff3');
    Route::get('listXStaff3', 'listXStaff3');
    Route::post('deleteStaff3', 'deleteStaff3');
    Route::post('updateStaff3', 'updateStaff3');
});


Route::controller(CategoryController::class)->group(function () {
    Route::post('registerCategory', 'registerCategory');
    Route::get('listCategory', 'listCategory');
    Route::get('listXCategory', 'listXCategory');
    Route::post('deleteCategory', 'deleteCategory');
    Route::post('updateCategory', 'updateCategory');
});

Route::controller(PaymentConditionController::class)->group(function () {
    Route::post('registerPaymentCondition', 'registerPaymentCondition');
    Route::get('listPaymentCondition', 'listPaymentCondition');
    Route::get('listXPaymentCondition', 'listXPaymentCondition');
    Route::post('deletePaymentCondition', 'deletePaymentCondition');
    Route::post('updatePaymentCondition', 'updatePaymentCondition');
});


Route::controller(CommercialSectionController::class)->group(function () {
    Route::post('registerCommercialSection', 'registerCommercialSection');
    Route::get('listCommercialSection', 'listCommercialSection');
    Route::get('listXCommercialSection', 'listXCommercialSection');
    Route::post('deleteCommercialSection', 'deleteCommercialSection');
    Route::post('updateCommercialSection', 'updateCommercialSection');
});


Route::controller(businessEntityController::class)->group(function () {
    Route::post('registerBusinessEntity', 'registerBusinessEntity');
    Route::get('listBusinessEntity', 'listBusinessEntity');
    Route::get('listXBusinessEntity', 'listXBusinessEntity');
    Route::post('deleteBusinessEntity', 'deleteBusinessEntity');
    Route::post('updateBusinessEntity', 'updateBusinessEntity');
    Route::get('listNationality', 'listNationality');
    Route::get('listTypeDocument', 'listTypeDocument');
    Route::get('listTypeQualifications', 'listTypeQualifications');
    Route::get('listCategorys', 'listCategorys');
    Route::get('listWaytoPays', 'listWaytoPays');
    Route::get('listPaymentConditions', 'listPaymentConditions');
});


Route::controller(CommercialSectionController::class)->group(function () {
    Route::post('registerCommercialSection', 'registerCommercialSection');
    Route::get('listCommercialSection', 'listCommercialSection');
    Route::get('listXCommercialSection', 'listXCommercialSection');
    Route::post('deleteCommercialSection', 'deleteCommercialSection');
    Route::post('updateCommercialSection', 'updateCommercialSection');
});


Route::controller(ProductServiceTypeController::class)->group(function () {
    Route::post('registerProductServiceType', 'registerProductServiceType');
    Route::get('listProductServiceType', 'listProductServiceType');
    Route::get('listXProductServiceType', 'listXProductServiceType');
    Route::post('deleteProductServiceType', 'deleteProductServiceType');
    Route::post('updateProductServiceType', 'updateProductServiceType');
});


Route::controller(InventoryController::class)->group(function () {
    Route::post('registerInventory', 'registerInventory');
    Route::get('listInventory', 'listInventory');
    Route::get('listXInventory', 'listXInventory');
    Route::post('deleteInventory', 'deleteInventory');
    Route::post('updateInventory', 'updateInventory');
});

Route::controller(FamilyController::class)->group(function () {
    Route::post('registerFamily', 'registerFamily');
    Route::get('listFamily', 'listFamily');
    Route::get('listXFamily', 'listXFamily');
    Route::post('deleteFamily', 'deleteFamily');
    Route::post('updateFamily', 'updateFamily');
});


Route::controller(ProfitByFamilyController::class)->group(function () {
    Route::post('registerProfitByFamily', 'registerProfitByFamily');
    Route::get('listProfitByFamily', 'listProfitByFamily');
    Route::get('listXProfitByFamily', 'listXProfitByFamily');
    Route::post('deleteProfitByFamily', 'deleteProfitByFamily');
    Route::post('updateProfitByFamily', 'updateProfitByFamily');
});
