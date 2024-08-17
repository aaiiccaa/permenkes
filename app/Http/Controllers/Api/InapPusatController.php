<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InapPusat;

class InapPusatController extends Controller
{
    public function index()
    {
        $inapPusat = InapPusat::all();
        return response()->json($inapPusat);
    }

    public function show($id)
    {
        $inapPusat = InapPusat::findOrFail($id);
        return response()->json($inapPusat);
    }

    public function store(Request $request)
{
    $request->validate([
        'kode' => 'required|string|max:255',
        'deskripsi' => 'required|string|max:255',
        'tarif_3' => 'required|numeric',
        'tarif_2' => 'required|numeric',
        'tarif_1' => 'required|numeric',
        'rumah_sakit' => 'required|string|max:255',
    ]);

    $inapPusat = InapPusat::create($request->all());
    return response()->json($inapPusat, 201);
}


public function update(Request $request, $id)
{
    $inapPusat = InapPusat::findOrFail($id);

    $request->validate([
        'kode' => 'sometimes|required|string|max:255',
        'deskripsi' => 'sometimes|required|string|max:255',
        'tarif_3' => 'sometimes|required|numeric',
        'tarif_2' => 'sometimes|required|numeric',
        'tarif_1' => 'sometimes|required|numeric',
        'rumah_sakit' => 'sometimes|required|string|max:255',
    ]);

    $inapPusat->update($request->all());
    return response()->json($inapPusat);
}


    public function destroy($id)
    {
        $inapPusat = InapPusat::findOrFail($id);
        $inapPusat->delete();
        return response()->json(null, 204);
    }

    public function searchInapPusat(Request $request)
    {
        $query = InapPusat::query();

        if ($request->has('rs')) {
            $query->where('rumah_sakit', 'LIKE', '%' . $request->input('rs') . '%');
        }

        if ($request->has('kode')) {
            $query->where('kode', 'LIKE', '%' . $request->input('kode') . '%');
        }

        if ($request->has('deskripsi')) {
            $query->where('deskripsi', 'LIKE', '%' . $request->input('deskripsi') . '%');
        }

        $inapPusat = $query->get();
        return response()->json($inapPusat);
    }
}
