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
        Schema::create('topup_umum', function (Blueprint $table) {
            $table->id();
            $table->string('kode_spesial');
            $table->string('deskripsi');
            $table->string('kode');
            $table->string('kelas_rawat');
            $table->string('kelas_a');
            $table->string('kelas_b');
            $table->string('kelas_c');
            $table->string('kelas_d');
            $table->string('regional');
            $table->string('kategori');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topup_umum');
    }
};
