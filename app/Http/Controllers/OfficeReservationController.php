<?php

namespace App\Http\Controllers;

use App\Models\OfficeReservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OfficeReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info("Requesting to create a new reservation");

        $validated = $request->validate([
            'date' => 'required|date',
            'desk_id' =>'exists:desks,id',
            'am_or_pm' => 'required|in:am,pm',
        ]);

        // TODO: validare che la data sia nel futuro (o forse anche oggi compreso?)
        
        $timeField = $validated['am_or_pm'] === 'am' ? 'morning_busy' : 'afternoon_busy';

        DB::beginTransaction();

        $existingReservation = OfficeReservation::where('reservation_day', $validated['date'])
                                             ->where($timeField, 1)
                                             ->where('desk_id', $validated['desk_id'])
                                             ->first();

        if ($existingReservation) {
            abort(409, 'Desk already reserved');
        } 
        
        $reservation = new OfficeReservation();
        $reservation->user_id = $request->user()->id;
        $reservation->desk_id = $validated['desk_id'];
        $reservation->reservation_day = $validated['date'];
        $reservation->morning_busy = $validated['am_or_pm'] === 'am';
        $reservation->afternoon_busy = $validated['am_or_pm'] === 'pm';
        $reservation->save();
        DB::commit();

        Log::info("Reservation created with id $reservation->id");

        return response()->json($reservation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(OfficeReservation $officeReservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OfficeReservation $officeReservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OfficeReservation $officeReservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $reservationId)
    {
        Log::info("Requesting to cancel a reservation");


        $reservation = OfficeReservation::find($reservationId);

        if (!$reservation) {
            abort(404, 'Reservation not found');
        }

        if ($request->user()->id !== $reservation->user_id) {
            abort(403, 'Operation forbidden');
        }
       
        $reservation->delete();

        Log::info("Reservation cancelled with id $reservationId");
    }
}
