<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HospitalPartner;

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
        ]);

        $hospitalPartner = HospitalPartner::create($request->all());
        return response()->json($hospitalPartner, 201);
    }

    public function update(Request $request, $id)
    {
        $hospitalPartner = HospitalPartner::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'owner' => 'required|string|max:255',
            'class' => 'required|string|max:10',
            'region' => 'required|integer',
        ]);

        $hospitalPartner->update($request->all());
        return response()->json($hospitalPartner);
    }

    public function destroy($id)
    {
        $hospitalPartner = HospitalPartner::findOrFail($id);
        $hospitalPartner->delete();
        return response()->json(null, 204);
    }
}
