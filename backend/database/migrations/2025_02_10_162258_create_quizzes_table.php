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
    Schema::create('quizzes', function (Blueprint $table) {
        $table->id();
        $table->string('question');
        
        // Add roadmap_id and quiz_id columns as unsignedBigInteger to match the referenced columns
        $table->unsignedBigInteger('roadmap_id');
        $table->unsignedBigInteger('quiz_id');
        $table->timestamps();
        
        // Add foreign key constraints
        $table->foreign('roadmap_id')
              ->references('id')
              ->on('roadmaps')
              ->onDelete('cascade');

        $table->foreign('quiz_id')
              ->references('id')
              ->on('answers')
              ->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
