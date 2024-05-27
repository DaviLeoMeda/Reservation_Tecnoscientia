<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OfficeController extends Controller
{
    public function listOffices(Request $request)
    {
        try {
            $offices = Office::all();

            return response()->json($offices);
        } catch (\Exception $e) {
            // Gestisci l'eccezione qui
            return response()->json(['error' => 'Errore durante il recupero degli uffici'], 500);
        }
    }

    private function loadDesksAndTheirReservations($officeId, $date)
    {
        return DB::table('desks')
            ->select('desks.id', 'desks.name', 'reservations.morning_busy', 'reservations.afternoon_busy', 'reservations.user_id')
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
                $deskRecord['am'] = 'free';
                $deskRecord['pm'] = 'free';

                $deskMap[$desk->id] = $deskRecord;
            }

            if ($desk->morning_busy) {
                $deskMap[$desk->id]['am'] = $desk->user_id;
            } else if ($desk->afternoon_busy) {
                $deskMap[$desk->id]['pm'] = $desk->user_id;
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
};
