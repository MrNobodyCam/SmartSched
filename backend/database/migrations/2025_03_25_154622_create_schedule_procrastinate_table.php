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
        Schema::create('schedule_procrastinate', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger(column: 'schedule_number');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('session_limit');
            $table->unsignedBigInteger('session_count')->default(0);
            $table->string('start_date');
            $table->string('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['schedule_number', 'user_id']);
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign(['user_id', 'schedule_number'])->references(['user_id', 'schedule_number'])->on('schedules')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedule_procrastinate');
    }
};
