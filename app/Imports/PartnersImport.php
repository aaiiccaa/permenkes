<?php

namespace App\Imports;

use App\Models\HospitalPartner;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class PartnersImport implements ToModel, WithStartRow
{
    protected $startRow;

    public function __construct($startRow = 1)
    {
        $this->startRow = $startRow;
    }

    /**
     * Tentukan dari baris mana impor harus dimulai.
     *
     * @return int
     */
    public function startRow(): int
    {
        return $this->startRow;
    }

    /**
     * Tentukan bagaimana data dari setiap baris Excel akan diimpor.
     *
     * @param array $row
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return HospitalPartner::updateOrCreate(
            ['rumah_sakit' => $row[0]], // Kriteria untuk mencari data yang sudah ada
            [
                'kab_kota' => $row[1],
                'alamat' => $row[2],
                'telepon' => $row[3],
                'pemilik' => $row[4],
                'kelas' => $row[5],
                'regional' => $row[6],
                'status' => $row[7],
                'kategori' => $row[8],
            ]
        );
    }
}

