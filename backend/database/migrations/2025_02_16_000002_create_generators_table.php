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
        Schema::create('generators', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('generator_number');
            $table->unsignedBigInteger('user_id');
            $table->string('schedule_title');
            $table->string('free_day');
            $table->string('start_time');
            $table->string('end_time');
            $table->string('duration');
            $table->timestamps();

            $table->unique(['user_id', 'generator_number']);
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generators');
    }
};
