<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HospitalPartner extends Model
{
    use HasFactory;

    protected $table = 'hospital_partners';

    protected $fillable = [
        'rumah_sakit',
        'kab_kota',
        'alamat',
        'telepon',
        'pemilik',
        'kelas',
        'regional',
    ];

    public $timestamps = true;
}
