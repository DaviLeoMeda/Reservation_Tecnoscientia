<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Office;

class OfficeController extends Controller
{
    public function index(Request $request)
    {
        try {
            $offices = Office::all();

            return response()->json($offices);
        } catch (\Exception $e) {
            // Gestisci l'eccezione qui
            return response()->json(['error' => 'Errore durante il recupero degli uffici'], 500);
        }
    }

    public function show(Office $office) {
        return $office;
    }


};
