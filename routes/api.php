<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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


Route::get('/offices', [OfficeController::class, 'listOffices']);
Route::get('/offices/{id}/desk-availability/{date}', [DeskController::class, 'listDeskAvailability']);

Route::post('/reservations', [OfficeReservationController::class, 'store'])
    // TODO: sistemare configurazione di Sanctum e scommentare la riga seguente
    // ->middleware('auth')
    ->name('reservation.store');

//PUT
Route::put('/updateReservation', [OfficeReservationController::class, 'update']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
