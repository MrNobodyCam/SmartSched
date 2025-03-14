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
    Route::get('/roadmap/{roadmap_id}', [RoadmapController::class, 'getRoadMapDetail']);
    Route::put('/roadmap/score/{roadmap_id}', [RoadmapController::class, 'updateRoadmapScore']);
    Route::get('/generate-schedule/roadmaps', [RoadmapController::class, 'getRoadMap']);
    Route::get('/generate-schedule/end', [RoadmapController::class, 'endSchedule']);
    Route::post('/history', [RoadmapController::class, 'getHistoryRoadMap']);
});
// // Group routes with prefix 'v1'
// Route::group(['prefix' => 'v1'], function () {
//     Route::post('schedule/generate', [ScheduleController::class, 'generateSchedule']);
//     Route::get('schedule/{id}', [ScheduleController::class, 'show']);
//     Route::delete('schedule/{id}', [ScheduleController::class, 'destroy']);
// });

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::apiResource('schedule', 'ScheduleController');
});
