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
        Schema::create('inap_pusat', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('deskripsi');
            $table->string('tarif_3');
            $table->string('tarif_2');
            $table->string('tarif_1');
            $table->string('rumah_sakit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inap_pusat');
    }
};
