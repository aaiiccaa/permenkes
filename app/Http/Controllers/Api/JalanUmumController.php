<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JalanUmum;

class JalanUmumController extends Controller
{
    public function index()
    {
        $jalanUmum = JalanUmum::all();
        return response()->json($jalanUmum);
    }

    public function show($id)
    {
        $jalanUmum = JalanUmum::findOrFail($id);
        return response()->json($jalanUmum);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode' => 'required|string|max:255',
            'deskripsi' => 'required|string|max:255',
            'tarif' => 'required|numeric',
            'regional' => 'required|string|max:10',
            'kelas' => 'required|string|max:10',
            'kategori' => 'required|string|max:255',
        ]);

        $jalanUmum = JalanUmum::create($request->all());
        return response()->json($jalanUmum, 201);
    }

    public function update(Request $request, $id)
    {
        $jalanUmum = jalanUmum::findOrFail($id);

        $request->validate([
            'kode' => 'sometimes|required|string|max:255',
            'deskripsi' => 'sometimes|required|string|max:255',
            'tarif'=> 'sometimes|required|numeric',
            'regional' => 'sometimes|required|string|max:10',
            'kelas' => 'sometimes|required|string|max:10',
            'kategori' => 'sometimes|required|string|max:255',
        ]);

        $jalanUmum->update($request->all());
        return response()->json($jalanUmum);
    }

    public function destroy($id)
    {
        $jalanUmum = JalanUmum::findOrFail($id);
        $jalanUmum->delete();
        return response()->json(null, 204);
    }

    public function searchJalanUmum(Request $request)
    {
        $query = JalanUmum::query();

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

        $jalanUmum = $query->get();
        return response()->json($jalanUmum);
    }
}
