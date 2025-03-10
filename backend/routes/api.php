<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\RoadmapController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/generatequizz', [QuizController::class, 'generateQuiz']);
    Route::get('/quizz/{id}', [QuizController::class, 'getQuizzes']);
    Route::get('/roadmap/{roadmap_id}', [RoadmapController::class, 'getRoadmap']);
    Route::put('/roadmap/score/{roadmap_id}', [RoadmapController::class, 'updateRoadmapScore']);
});
