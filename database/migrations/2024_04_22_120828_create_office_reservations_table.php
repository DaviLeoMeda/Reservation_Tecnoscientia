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
        Schema::create('office_reservations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('reservation_day');
            $table->boolean('morning_busy');
            $table->boolean('afternoon_busy');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('office_reservations');
    }
};
