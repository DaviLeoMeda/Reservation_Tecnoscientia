<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\Utils;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Exception;
use App\Models\Office;




class OfficeController extends Controller
{
    public function getOffice(Request $request)
    {
        try {
            $offices = Office::all(); // Recupera tutti gli uffici dal database

            return response()->json($offices);
        } catch (\Exception $e) {
            // Gestisci l'eccezione qui
            return response()->json(['error' => 'Errore durante il recupero degli uffici'], 500);
        }
    }
};
