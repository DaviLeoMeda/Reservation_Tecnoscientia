<?php

namespace App\Http\Controllers;
use App\Models\OfficeReservation;
use App\Models\Desk;
use Illuminate\Http\Request;

class DeskController extends Controller
{
    public function getDesk(Request $request)
    {
        try {
            $desks = Desk::all();

            return response()->json($desks);
        } catch (\Exception $e) {
            // Gestisci l'eccezione qui
            return response()->json(['error' => 'Errore durante il recupero degli uffici'], 500);
        }
    }

    public function getOccupation(Request $request)
    {
        $request->validate([
            'reservation_day' => 'required|date',
        ]);

        $reservationDay = $request->input('reservation_day');

        $occupations = OfficeReservation::where('reservation_day', $reservationDay)
            ->where(function($query) {
                $query->where('morning_busy', true)
                      ->orWhere('afternoon_busy', true);
            })
            ->get(['desk_id', 'morning_busy', 'afternoon_busy']);

        return response()->json($occupations);
    }
}
