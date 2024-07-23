<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jalan_pusats', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('deskripsi');
            $table->string('tarif');
            $table->string('rumah_sakit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jalan_pusats');
    }
};
