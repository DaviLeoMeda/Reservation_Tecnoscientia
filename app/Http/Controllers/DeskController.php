<?php

namespace App\Http\Controllers;

use App\Models\OfficeReservation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

class DeskController extends Controller
{
    private function loadDesksAndTheirReservations($officeId, $date)
    {
        return DB::table('desks')
            ->select('desks.id', 'desks.name', 'reservations.morning_busy', 'reservations.afternoon_busy', 'reservations.user_id', 'reservations.id as reservation_id')
            ->leftJoin('office_reservations as reservations', function ($join) use ($date) {
                $join->on('desks.id', '=', 'reservations.desk_id');
                $join->on('reservations.reservation_day', '=', DB::raw("'$date'"));
            })
            ->where('office_id', $officeId)
            ->get();
    }

    private function createMapOfDesksWithTheirAvailability($desks) {
        $deskMap = [];
        foreach ($desks as $desk) {
            if (!array_key_exists($desk->id, $deskMap)) {
                $deskRecord = [];
                $deskRecord['id'] = $desk->id;
                $deskRecord['name'] = $desk->name;
                $deskRecord['am'] = ['status' => 'free', 'reservation_id' => null];
                $deskRecord['pm'] = ['status' => 'free', 'reservation_id' => null];


                $deskMap[$desk->id] = $deskRecord;
            }

            if ($desk->morning_busy) {
                $deskMap[$desk->id]['am'] = [
                    'status' => $desk->user_id,
                    'reservation_id' => $desk->reservation_id
                ];
            } else if ($desk->afternoon_busy) {
                $deskMap[$desk->id]['pm'] = [
                    'status' => $desk->user_id,
                    'reservation_id' => $desk->reservation_id
                ];
            }
        }

        return $deskMap;
    }

    private function convertMapToArray($deskMap) {
        $result = [];
        foreach ($deskMap as $id => $deskRecord) {
            $result[] = $deskRecord;
        }

        usort($result, function ($d1, $d2) {
            return $d1['id'] - $d2['id'];
        });

        return $result;
    }

    public function listDeskAvailability(int $id, string $date)
    {
        try {
            $desks = $this->loadDesksAndTheirReservations($id, $date);

            $deskMap = $this->createMapOfDesksWithTheirAvailability($desks);

            return $this->convertMapToArray($deskMap);

        } catch (\Exception $e) {
            // Gestisci l'eccezione qui
            Log::error($e);
            return response()->json(['error' => 'Errore durante il recupero delle scrivanie'], 500);
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
