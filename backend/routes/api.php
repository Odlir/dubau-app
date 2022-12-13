<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\LineController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\MakerController;
use App\Http\Controllers\WayToPayController;
use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\TypeQualificationController;
use App\Http\Controllers\UnitMeasureController;
use App\Http\Controllers\PositionController;
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
