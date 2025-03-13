<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\RoadmapController;
use App\Http\Controllers\Api\V1\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::prefix('v1')->group(function () {
    Route::post('/generatequizz', [QuizController::class, 'generateQuiz']);
    Route::get('/quizz/{id}', [QuizController::class, 'getQuizzes']);
    Route::get('/roadmap/{roadmap_id}', [RoadmapController::class, 'getRoadMapDetail']);
    Route::put('/roadmap/score/{roadmap_id}', [RoadmapController::class, 'updateRoadmapScore']);
    Route::get('/generate-schedule/roadmaps', [RoadmapController::class, 'getRoadMap']);
    Route::apiResource('schedule', 'ScheduleController');
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
