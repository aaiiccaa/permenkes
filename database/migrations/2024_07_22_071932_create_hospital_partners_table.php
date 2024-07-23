<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHospitalPartnersTable extends Migration
{
    public function up()
    {
        Schema::create('hospital_partners', function (Blueprint $table) {
            $table->id();
            $table->string('rumah_sakit');
            $table->string('kab_kota');
            $table->string('alamat');
            $table->string('telepon');
            $table->string('pemilik');
            $table->string('kelas');
            $table->string('regional');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hospital_partners');
    }
}
