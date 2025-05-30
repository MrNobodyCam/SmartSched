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
        Schema::create('roadmaps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('roadmap_number');
            $table->unsignedBigInteger('topic_id');
            $table->unsignedBigInteger('schedule_id');
            // $table->unsignedBigInteger('user_id')->default(1);
            // $table->unsignedBigInteger('schedule_number')->default(1);
            $table->string('lesson');
            $table->text('description');
            $table->integer('result')->nullable();
            $table->time('start_time');
            $table->time('end_time');
            $table->date('date');
            $table->timestamps();

            $table->unique(['roadmap_number', 'schedule_id']);
            $table->foreign('topic_id')
                ->references('id')
                ->on('topics')
                ->onDelete('cascade');
            $table->foreign('schedule_id')
                ->references('id')
                ->on('schedules')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roadmaps');
    }
};
