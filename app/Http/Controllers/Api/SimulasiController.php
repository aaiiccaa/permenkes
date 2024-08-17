<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SimulasiController extends Controller
{
    public function simulate(Request $request)
    {
        $rumahSakit = $request->input('rumah_sakit');
        $deskripsi = $request->input('deskripsi');

        $queryInapUmum = DB::table('inap_umum as iu')
            ->join(DB::raw('(SELECT regional, kelas, pemilik, status, rumah_sakit, kategori
                            FROM hospital_partners
                            WHERE rumah_sakit LIKE "%' . $rumahSakit . '%" LIMIT 1) as hp_filtered'),
                function($join) {
                    $join->on('iu.regional', '=', 'hp_filtered.regional')
                         ->on('iu.kelas', '=', 'hp_filtered.kelas')
                         ->on('iu.kategori', '=', 'hp_filtered.pemilik');
                })
            ->select('iu.deskripsi', 'iu.tarif_3', 'iu.tarif_2', 'iu.tarif_1', 'hp_filtered.status', 'hp_filtered.kategori' , 'hp_filtered.rumah_sakit', 'hp_filtered.pemilik')
            ->where('hp_filtered.kategori', 'umum')
            ->where(function($query) use ($deskripsi) {
                $deskripsiCount = count($deskripsi);

                $orConditions = [];

                for ($i = 0; $i < $deskripsiCount; $i += 2) {
                    if (isset($deskripsi[$i + 1])) {
                        $orConditions[] = function($query) use ($deskripsi, $i) {
                            $query->where('iu.deskripsi', 'like', '%'.$deskripsi[$i].'%')
                                  ->where('iu.deskripsi', 'like', '%'.$deskripsi[$i + 1].'%');
                        };
                    }
                }

                if (!empty($orConditions)) {
                    $query->where(function($query) use ($orConditions) {
                        foreach ($orConditions as $condition) {
                            $query->orWhere($condition);
                        }
                    });
                }
            })
            ->unionAll(
                DB::table('inap_pusat as ip')
                    ->join(DB::raw('(SELECT regional, kelas, pemilik, status, rumah_sakit, kategori
                                    FROM hospital_partners
                                    WHERE rumah_sakit LIKE "%' . $rumahSakit . '%" LIMIT 1) as hp_filtered'),
                        function($join) {
                            $join->on('ip.rumah_sakit', '=', 'hp_filtered.rumah_sakit');
                        })
                    ->select('ip.deskripsi', 'ip.tarif_3', 'ip.tarif_2', 'ip.tarif_1', 'hp_filtered.status', 'hp_filtered.kategori', 'hp_filtered.rumah_sakit', 'hp_filtered.pemilik')
                    ->where('hp_filtered.kategori', 'pusat')
                    ->where(function($query) use ($deskripsi) {
                        $deskripsiCount = count($deskripsi);

                        $orConditions = [];

                        for ($i = 0; $i < $deskripsiCount; $i += 2) {
                            if (isset($deskripsi[$i + 1])) {
                                $orConditions[] = function($query) use ($deskripsi, $i) {
                                    $query->where('ip.deskripsi', 'like', '%'.$deskripsi[$i].'%')
                                          ->where('ip.deskripsi', 'like', '%'.$deskripsi[$i + 1].'%');
                                };
                            }
                        }

                        if (!empty($orConditions)) {
                            $query->where(function($query) use ($orConditions) {
                                foreach ($orConditions as $condition) {
                                    $query->orWhere($condition);
                                }
                            });
                        }
                    })
            )
            ->get();

        return response()->json($queryInapUmum);
    }
}
