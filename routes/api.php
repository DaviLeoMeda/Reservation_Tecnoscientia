<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\DeskController;
use App\Http\Controllers\OfficeReservationController;

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




//GET
Route::get('/getOffice', [OfficeController::class, 'getOffice']);
Route::get('/offices/{id}/desks', [OfficeController::class, 'listDesks']);
Route::get('/getDesk', [DeskController::class, 'getDesk']);
Route::get('/getOccupation', [DeskController::class, 'getOccupation']);

//POST
Route::post('/postReservation', [OfficeReservationController::class, 'store'])->name('reservation.store');

//PUT
Route::put('/updateReservation', [OfficeReservationController::class, 'update']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});