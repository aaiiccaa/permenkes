<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TopupUmum;

class TopupUmumController extends Controller
{
    public function index()
    {
        $topupUmum = TopupUmum::all();
        return response()->json($topupUmum);
    }

    public function show($id)
    {
        $topupUmum = TopupUmum::findOrFail($id);
        return response()->json($topupUmum);
    }

    public function store(Request $request)
{
    $request->validate([
        'kode_spesial' => 'required|string|max:255',
        'deskripsi' => 'required|string|max:255',
        'kode' => 'required|string|max:255',
        'kelas_rawat' => 'required|numeric',
        'kelas_a' => 'required|numeric',
        'kelas_b' => 'required|numeric',
        'kelas_c' => 'required|numeric',
        'kelas_d' => 'required|numeric',
        'regional' => 'required|numeric',
        'kategori' => 'required|string|max:255',
    ]);

    $topupUmum = TopupUmum::create($request->all());
    return response()->json($topupUmum, 201);
}


public function update(Request $request, $id)
{
    $topupUmum = TopupUmum::findOrFail($id);

    $request->validate([
        'kode_spesial' => 'sometimes|required|string|max:255',
        'deskripsi' => 'sometimes|required|string|max:255',
        'kode' => 'sometimes|required|string|max:255',
        'kelas_rawat' => 'sometimes|required|numeric',
        'kelas_a' => 'sometimes|required|numeric',
        'kelas_b' => 'sometimes|required|numeric',
        'kelas_c' => 'sometimes|required|numeric',
        'kelas_d' => 'sometimes|required|numeric',
        'regional' => 'sometimes|required|numeric',
        'kategori' => 'sometimes|required|string|max:255',
    ]);

    $topupUmum->update($request->all());
    return response()->json($topupUmum);
}


    public function destroy($id)
    {
        $topupUmum = TopupUmum::findOrFail($id);
        $topupUmum->delete();
        return response()->json(null, 204);
    }

    public function searchTopupUmum(Request $request)
    {
        $query = TopupUmum::query();

        if ($request->has('kode')) {
            $query->where('kode', 'LIKE', '%' . $request->input('kode') . '%');
        }

        if ($request->has('deskripsi')) {
            $query->where('deskripsi', 'LIKE', '%' . $request->input('deskripsi') . '%');
        }

        if ($request->has('kelas')) {
            $query->where('kelas_rawat', $request->input('kelas'));
        }

        if ($request->has('regional')) {
            $query->where('regional', $request->input('regional'));
        }

        if ($request->has('kategori')) {
            $query->where('kategori', $request->input('kategori'));
        }

        $topupUmum = $query->get();
        return response()->json($topupUmum);
    }
}
