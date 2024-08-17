<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopupPusat extends Model
{
    use HasFactory;

    protected $table = 'topup_pusat';

    protected $fillable = [
        'kode_spesial',
        'deskripsi',
        'kode',
        'kelas',
        'rscm',
        'rsjp_hk',
        'rsab_hk',
        'rsk',
        'rspon'
    ];
    
    public $timestamps = false;
}
