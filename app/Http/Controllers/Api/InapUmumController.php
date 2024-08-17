<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InapUmum;

class InapUmumController extends Controller
{
    public function index()
    {
        $inapUmum = InapUmum::all();
        return response()->json($inapUmum);
    }

    public function show($id)
    {
        $inapUmum = InapUmum::findOrFail($id);
        return response()->json($inapUmum);
    }

    public function store(Request $request)
{
    $request->validate([
        'kode' => 'required|string|max:255',
        'deskripsi' => 'required|string|max:255',
        'tarif_3' => 'required|numeric',
        'tarif_2' => 'required|numeric',
        'tarif_1' => 'required|numeric',
        'regional' => 'required|integer',
        'kelas' => 'required|string|max:10',
        'kategori' => 'required|string|max:10',
    ]);

    $inapUmum = InapUmum::create($request->all());
    return response()->json($inapUmum, 201);
}


public function update(Request $request, $id)
{
    $inapUmum = InapUmum::findOrFail($id);

    $request->validate([
        'kode' => 'sometimes|required|string|max:255',
        'deskripsi' => 'sometimes|required|string|max:255',
        'tarif_3' => 'sometimes|required|numeric',
        'tarif_2' => 'sometimes|required|numeric',
        'tarif_1' => 'sometimes|required|numeric',
        'regional' => 'sometimes|required|integer',
        'kelas' => 'sometimes|required|string|max:10',
        'kategori' => 'sometimes|required|string|max:10',
    ]);

    $inapUmum->update($request->all());
    return response()->json($inapUmum);
}


    public function destroy($id)
    {
        $inapUmum = InapUmum::findOrFail($id);
        $inapUmum->delete();
        return response()->json(null, 204);
    }

    public function searchInapUmum(Request $request)
    {
        $query = InapUmum::query();

        if ($request->has('kode')) {
            $query->where('kode', 'LIKE', '%' . $request->input('kode') . '%');
        }

        if ($request->has('deskripsi')) {
            $query->where('deskripsi', 'LIKE', '%' . $request->input('deskripsi') . '%');
        }

        if ($request->has('kelas')) {
            $query->where('kelas', $request->input('kelas'));
        }

        if ($request->has('regional')) {
            $query->where('regional', $request->input('regional'));
        }

        if ($request->has('kategori')) {
            $query->where('kategori', $request->input('kategori'));
        }

        $inapUmum = $query->get();
        return response()->json($inapUmum);
    }
}
