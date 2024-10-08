<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JalanPusat extends Model
{
    use HasFactory;

    protected $table = 'jalan_pusat';

    protected $fillable = [
        'kode',
        'deskripsi',
        'tarif',
        'rumah_sakit',
    ];

    public $timestamps = false;
        
}
