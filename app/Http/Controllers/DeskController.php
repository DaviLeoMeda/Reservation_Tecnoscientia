<?php

namespace App\Http\Controllers;

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
}
