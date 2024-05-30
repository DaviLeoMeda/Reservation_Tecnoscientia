<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeskController extends Controller
{
    private function loadDesksAndTheirReservations($officeId, $date)
    {
        return DB::table('desks')
            ->select(
                'desks.id as desk_id',
                'desks.name',
                'reservations.id as reservation_id',
                'reservations.morning_busy',
                'reservations.afternoon_busy',
                'reservations.user_id'
            )
            ->leftJoin('office_reservations as reservations', function ($join) use ($date) {
                $join->on('desks.id', '=', 'reservations.desk_id');
                $join->on('reservations.reservation_day', '=', DB::raw("'$date'"));
            })
            ->where('office_id', $officeId)
            ->get();
    }

    private function createMapOfDesksWithTheirAvailability($desks)
    {
        $deskMap = [];
        foreach ($desks as $desk) {
            if (!array_key_exists($desk->desk_id, $deskMap)) {
                $deskRecord = [];
                $deskRecord['id'] = $desk->desk_id;
                $deskRecord['name'] = $desk->name;
                $deskRecord['am'] = [];
                $deskRecord['pm'] = [];

                $deskMap[$desk->desk_id] = $deskRecord;
            }

            if ($desk->morning_busy) {
                $deskMap[$desk->desk_id]['am'] = [
                    'user' => $desk->user_id,
                    'reservation' => $desk->reservation_id
                ];

            } else if ($desk->afternoon_busy) {
                $deskMap[$desk->desk_id]['pm'] = [
                    'user' => $desk->user_id,
                    'reservation' => $desk->reservation_id
                ];
            }
        }

        return $deskMap;
    }

    private function convertMapToArray($deskMap)
    {
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
}
