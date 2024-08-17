<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TopupPusat;

class TopupPusatController extends Controller
{
    public function index()
    {
        $topupPusat = TopupPusat::all();
        return response()->json($topupPusat);
    }

    public function show($id)
    {
        $topupPusat = TopupPusat::findOrFail($id);
        return response()->json($topupPusat);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_spesial' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'kode' => 'required|string|max:255',
            'kelas_rawat' => 'required|numeric',
            'rscm' => 'required|numeric',
            'rsjp_hk' => 'required|numeric',
            'rsab_hk' => 'required|numeric',
            'rsk' => 'required|numeric',
            'rspon' => 'required|numeric',
        ]);

        $topupPusat = TopupPusat::create($request->all());
        return response()->json($topupPusat, 201);
    }

    public function update(Request $request, $id)
    {
        $topupPusat = TopupPusat::findOrFail($id);

        $request->validate([
            'kode_spesial' => 'sometimes|required|string|max:255',
            'deskripsi' => 'sometimes|required|string|max:255',
            'kode' => 'sometimes|required|string|max:255',
            'kelas_rawat' => 'sometimes|required|numeric',
            'rscm' => 'sometimes|required|numeric',
            'rsjp_hk' => 'sometimes|required|numeric',
            'rsab_hk' => 'sometimes|required|numeric',
            'rsk' => 'sometimes|required|numeric',
            'rspon' => 'sometimes|required|numeric',
        ]);

        $topupPusat->update($request->all());
        return response()->json($topupPusat);
    }

    public function destroy($id)
    {
        $topupPusat = TopupPusat::findOrFail($id);
        $topupPusat->delete();
        return response()->json($topupPusat);
    }

    public function searchTopupPusat(Request $request)
    {
        $query = TopupPusat::query();

        if ($request->has('kode')) {
            $query->where('kode', 'LIKE', '%' . $request->input('kode') . '%');
        }

        if ($request->has('deskripsi')) {
            $query->where('deskripsi', 'LIKE', '%' . $request->input('deskripsi') . '%');
        }

        if ($request->has('kelas')) {
            $query->where('kelas', $request->input('kelas'));
        }

        $topupPusat = $query->get();
        return response()->json($topupPusat);
    }
}
