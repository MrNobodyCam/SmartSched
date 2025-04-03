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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            // $table->unsignedBigInteger('generator_id');
            $table->unsignedBigInteger('schedule_number')->unique();
            $table->unsignedBigInteger('generator_number')->unique();
            $table->enum('status', ['active', 'procrastinate', 'end'])->default('active');
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('generator_number')->references('generator_number')->on('generators')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};
