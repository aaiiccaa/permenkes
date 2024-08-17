<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penyakit extends Model
{
    use HasFactory;

    protected $table = 'data_penyakit';

    protected $fillable = [
        'penyakit'
    ];

    public $timestamps = false;
}
