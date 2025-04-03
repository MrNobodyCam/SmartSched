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
        Schema::create('schedule_notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->unsignedBigInteger('schedule_number')->unique()->nullable();
            $table->unsignedBigInteger('roadmap_number')->unique()->nullable();
            $table->enum('notification_type', ['schedule_end', 'schedule_procrastinate', 'time_study'])->default('schedule_end');
            $table->string('title');
            $table->text('message');
            $table->enum('type', ['error', 'info', 'success'])->default('success');
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            $table->foreign('roadmap_number')
                ->references('roadmap_number')
                ->on('roadmaps')
                ->onDelete('cascade');
            $table->foreign('schedule_number')
                ->references('schedule_number')
                ->on('schedules')
                ->onDelete('cascade');
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
        Schema::dropIfExists('schedule_notifications');
    }
};
