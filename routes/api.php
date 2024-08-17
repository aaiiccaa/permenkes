<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\HospitalPartnerController;
use App\Http\Controllers\Api\InapPusatController;
use App\Http\Controllers\Api\InapUmumController;
use App\Http\Controllers\Api\JalanPusatController;
use App\Http\Controllers\Api\JalanUmumController;
use App\Http\Controllers\Api\TopupPusatController;
use App\Http\Controllers\Api\TopupUmumController;
use App\Http\Controllers\Api\SimulasiController;
use App\Http\Controllers\Api\PenyakitController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::get('logout',[AuthController::class,'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users',UserController::class);
});


Route::apiResource('hospital_partners', HospitalPartnerController::class);
Route::apiResource('inap_pusat', InapPusatController::class);
Route::apiResource('inap_umum', InapUmumController::class);
Route::apiResource('jalan_pusat', JalanPusatController::class);
Route::apiResource('jalan_umum', JalanUmumController::class);
Route::apiResource('topup_pusat', TopupPusatController::class);
Route::apiResource('topup_umum', TopupUmumController::class);
Route::apiResource('penyakit', PenyakitController::class);

Route::get('/hospital_partners', [HospitalPartnerController::class, 'searchHospital']);
Route::get('/inap_pusat', [InapPusatController::class, 'searchInapPusat']);
Route::get('/inap_umum', [InapUmumController::class, 'searchInapUmum']);
Route::get('/jalan_umum', [JalanUmumController::class, 'searchJalanUmum']);
Route::get('/jalan_pusat', [JalanPusatController::class, 'searchJalanPusat']);
Route::get('/topup_pusat', [TopupPusatController::class, 'searchTopupPusat']);
Route::get('/topup_umum', [TopupUmumController::class, 'searchTopupUmum']);

Route::get('/simulation', [SimulasiController::class, 'simulate']);
Route::get('/search', [HospitalPartnerController::class, 'search']);
Route::get('/deskripsi', [PenyakitController::class, 'search']);

Route::post('/upload-data', [HospitalPartnerController::class, 'uploadData']);

Route::post('login',[AuthController::class,'login']);
Route::post('register',[AuthController::class,'register']);