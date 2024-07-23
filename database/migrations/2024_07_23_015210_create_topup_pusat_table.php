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
        Schema::create('topup_pusat', function (Blueprint $table) {
            $table->id();
            $table->string('kode_spesial');
            $table->string('deskripsi');
            $table->string('kode');
            $table->string('kelas');
            $table->string('rscm');
            $table->string('rsjp_hk');
            $table->string('rsab_hk');
            $table->string('rsk');
            $table->string('rspon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('topup_pusat');
    }
};
