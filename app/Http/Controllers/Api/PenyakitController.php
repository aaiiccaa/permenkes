<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Penyakit;

class PenyakitController extends Controller
{
    public function index()
    {
        $penyakit = Penyakit::all();
        return response()->json($penyakit);
    }

    public function show($id)
    {
        $penyakit = Penyakit::findOrFail($id);
        return response()->json($penyakit);
    }

    public function store(Request $request)
    {
        $request->validate([
            'penyakit' => 'required|string|max:255'
        ]);

        $penyakit = Penyakit::create($request->all());
        return response()->json($penyakit, 201);
    }

    public function update(Request $request, $id)
    {
        $penyakit = Penyakit::findOrFail($id);
        
        $request->validate([
            'penyakit' => 'required|string|max:255'
        ]);

        $penyakit->update($request->all());
        return response()->json($penyakit);
    }

    public function destroy($id)
    {
        $penyakit = Penyakit::findOrFail($id);
        $penyakit->delete();
        return response()->json(['message' => 'Disease deleted successfully'], 204);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $penyakit = Penyakit::where('penyakit', 'like', "%$query%")->limit(20)->get('penyakit');
        return response()->json($penyakit);
    }

}