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

};
