<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InapPusat extends Model
{
    use HasFactory;

    protected $table = 'inap_pusat';

    protected $fillable = [
        'kode',
        'deskripsi',
        'tarif_3',
        'tarif_2',
        'tarif_1',
        'rumah_sakit',
    ];

    public $timestamps = false;
}
