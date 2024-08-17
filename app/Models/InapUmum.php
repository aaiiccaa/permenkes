<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InapUmum extends Model
{
    use HasFactory;

    protected $table = 'inap_umum';

    protected $fillable = [
        'kode',
        'deskripsi',
        'tarif_3',
        'tarif_2',
        'tarif_1',
        'regional',
        'kelas',
        'kategori',
    ];

    public $timestamps = false;
}
