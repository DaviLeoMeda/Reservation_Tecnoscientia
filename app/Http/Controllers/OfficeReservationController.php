<?php

namespace App\Http\Controllers;

use App\Models\OfficeReservation;
use Illuminate\Http\Request;

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
        $request->validate([
            'reservation_day' => 'required|date',
        ]);


        $existingReservation = OfficeReservation::where('reservation_day', $request->reservation_day)
            ->where('desk_id', $request->desk_id)
            ->where('user_id', $request->user_id)
            ->first();

            $existingReservation = 

            
            
            return response()->json($existingReservation, 200);
        } else {
            
            $reservation = new OfficeReservation();
            $reservation->user_id = $request->user_id;
            $reservation->desk_id = $request->desk_id;
            $reservation->reservation_day = $request->reservation_day;
            $reservation->morning_busy = $request->morning_busy;
            $reservation->afternoon_busy = $request->afternoon_busy;
            $reservation->save();

            return response()->json($reservation, 201);
        }

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
    public function destroy(OfficeReservation $officeReservation)
    {
        //
    }
}
