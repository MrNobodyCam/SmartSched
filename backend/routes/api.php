<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\RoadmapController;
use App\Http\Controllers\Api\V1\ScheduleController;
use App\Http\Controllers\Api\V1\NotificationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::post('/generatequizz', [QuizController::class, 'generateQuiz']);
    Route::get('/quizz/{id}', [QuizController::class, 'getQuizzes']);
    Route::get('/roadmap/detail', [RoadmapController::class, 'getRoadMapDetail']);
    Route::put('/roadmap/score', [RoadmapController::class, 'updateRoadmapScore']);
    Route::get('/generate-schedule/roadmaps', [RoadmapController::class, 'getRoadMap']);
    Route::get('/generate-schedule/end', [ScheduleController::class, 'endSchedule']);
    Route::post('/history', [RoadmapController::class, 'getHistoryRoadMap']);
    Route::get('/history-schedule', [ScheduleController::class, 'getHistorySchedule']);
    Route::get('/notification', [NotificationController::class, 'getNotification']);
    Route::put('/notification/markAsRead', [NotificationController::class, 'markAsRead']);
    Route::get('/notification/markAllAsRead', [NotificationController::class, 'markAllAsRead']);
});
// // Group routes with prefix 'v1' 
// Route::group(['prefix' => 'v1'], function () {
//     Route::post('schedule/generate', [ScheduleController::class, 'generateSchedule']);
//     Route::get('schedule/{id}', [ScheduleController::class, 'show']);
//     Route::delete('schedule/{id}', [ScheduleController::class, 'destroy']);
// });

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::apiResource('schedule', 'GenerateScheduleController');
});
