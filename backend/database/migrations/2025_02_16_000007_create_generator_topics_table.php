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
        Schema::create('generator_topics', function (Blueprint $table) {
            $table->unsignedBigInteger('generator_id');
            $table->unsignedBigInteger('topic_id');
            $table->timestamps();

            $table->foreign('generator_id')
                ->references('id')
                ->on('generators')
                ->onDelete('cascade');
            $table->foreign('topic_id')
                ->references('id')
                ->on('topics')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('generator_topics');
    }
};
