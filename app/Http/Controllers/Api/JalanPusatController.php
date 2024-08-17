<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JalanPusat;

class JalanPusatController extends Controller
{
    public function index()
    {
        $jalanPusat = JalanPusat::all();
        return response()->json($jalanPusat);
    }

    public function show($id)
    {
        $jalanPusat = JalanPusat::findOrFail($id);
        return response()->json($jalanPusat);
    }

    public function store(Request $request)
{
    $request->validate([
        'kode' => 'required|string|max:255',
        'deskripsi' => 'required|string|max:255',
        'tarif' => 'required|numeric',
        'rumah_sakit' => 'required|string|max:255',
    ]);

    $jalanPusat = JalanPusat::create($request->all());
    return response()->json($jalanPusat, 201);
}


public function update(Request $request, $id)
{
    $jalanPusat = JalanPusat::findOrFail($id);

    $request->validate([
        'kode' => 'sometimes|required|string|max:255',
        'deskripsi' => 'sometimes|required|string|max:255',
        'tarif' => 'sometimes|required|numeric',
        'rumah_sakit' => 'sometimes|required|string|max:255',
    ]);

    $jalanPusat->update($request->all());
    return response()->json($jalanPusat);
}


    public function destroy($id)
    {
        $jalanPusat = JalanPusat::findOrFail($id);
        $jalanPusat->delete();
        return response()->json(null, 204);
    }

    public function searchJalanPusat(Request $request)
    {
        $query = JalanPusat::query();

        if ($request->has('kode')) {
            $query->where('kode', 'LIKE', '%' . $request->input('kode') . '%');
        }

        if ($request->has('deskripsi')) {
            $query->where('deskripsi', 'LIKE', '%' . $request->input('deskripsi') . '%');
        }

        if ($request->has('rs')) {
            $query->where('rumah_sakit', 'LIKE', '%' . $request->input('rs') . '%');
        }

        $jalanPusat = $query->get();
        return response()->json($jalanPusat);
    }
}
