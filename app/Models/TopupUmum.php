<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopupUmum extends Model
{
    use HasFactory;

    protected $table = 'topup_umum';

    protected $fillable = [
        'kode_spesial',
        'deskripsi',
        'kode',
        'kelas_rawat',
        'kelas_a',
        'kelas_b',
        'kelas_c',
        'kelas_d',
        'regional',
        'kategori'
    ];

    public $timestamps = false;
}
