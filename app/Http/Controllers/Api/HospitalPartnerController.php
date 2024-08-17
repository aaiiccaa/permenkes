<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\HospitalPartner;
use App\Imports\PartnersImport;

class HospitalPartnerController extends Controller
{
    public function index()
    {
        $hospitalPartners = HospitalPartner::all();
        return response()->json($hospitalPartners);
    }

    public function show($id)
    {
        $hospitalPartner = HospitalPartner::findOrFail($id);
        return response()->json($hospitalPartner);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'owner' => 'required|string|max:255',
            'class' => 'required|string|max:10',
            'region' => 'required|integer',
            'status' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
        ]);

        $hospitalPartner = HospitalPartner::create($request->all());
        return response()->json($hospitalPartner, 201);
    }

    public function update(Request $request, $id)
    {
        $hospitalPartner = HospitalPartner::findOrFail($id);
        
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'city' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string',
            'phone' => 'sometimes|required|string|max:20',
            'owner' => 'sometimes|required|string|max:255',
            'class' => 'sometimes|required|string|max:10',
            'region' => 'sometimes|required|integer',
            'status' => 'sometimes|required|string|max:255',
            'kategori' => 'sometimes|required|string|max:255',
        ]);

        $hospitalPartner->update($request->all());
        return response()->json($hospitalPartner);
    }

    public function destroy($id)
    {
        $hospitalPartner = HospitalPartner::findOrFail($id);
        $hospitalPartner->delete();
        return response()->json(['message' => 'Hospital Partner deleted successfully'], 204);
    }

    public function searchHospital(Request $request)
    {
        $query = HospitalPartner::query();

        if ($request->has('area')) {
            $query->where('kab_kota', 'LIKE', '%' . $request->input('area') . '%');
        }

        if ($request->has('kelas')) {
            $query->where('kelas', $request->input('kelas'));
        }

        if ($request->has('rs')) {
            $query->where('rumah_sakit', 'LIKE', '%' . $request->input('rs') . '%');
        }

        if ($request->has('pemilik')) {
            $query->where('pemilik', $request->input('pemilik'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        $hospitalPartners = $query->get();
        return response()->json($hospitalPartners);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $hospitals = HospitalPartner::where('rumah_sakit', 'like', "%$query%")->limit(20)->get('rumah_sakit');
        return response()->json($hospitals);
    }

    public function uploadData(Request $request)
    {
        $file = $request->file('file');

        $firstRow = Excel::toArray([], $file)[0][0];

        if (strtolower($firstRow[0]) === 'rumah_sakit') {
            Excel::import(new PartnersImport(2), $file);
        } else {
            Excel::import(new PartnersImport(1), $file);
        }

        return response()->json(['message' => 'Data uploaded successfully']);
    }


}