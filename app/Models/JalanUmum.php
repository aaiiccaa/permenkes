<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JalanUmum extends Model
{
    use HasFactory;

    protected $table = 'jalan_umum';

    protected $fillable = [
        'kode',
        'deskripsi',
        'tarif',
        'regional',
        'kelas',
        'kategori',
    ];

    public $timestamps = false;
}
