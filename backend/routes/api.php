<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\RoadmapController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\OtpController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/v1/auth/logout', [AuthController::class, 'logout']);
});

/* Auth Routes */
Route::prefix('v1/auth')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/signin', [AuthController::class, 'signin'])->name('signin');
});

/* Otp Routes */
Route::prefix('v1/auth')->group(function () {
    Route::get('/verification/{id}',[OtpController::class,'verification']);
    Route::post('/verified',[OtpController::class,'verifiedOtp'])->name('verifiedOtp');
    Route::get('/resend-otp',[OtpController::class,'resendOtp'])->name('resendOtp');
});

Route::prefix('v1')->group(function () {
    Route::post('/generatequizz', [QuizController::class, 'generateQuiz']);
    Route::get('/quizz/{id}', [QuizController::class, 'getQuizzes']);
    Route::get('/roadmap/{roadmap_id}', [RoadmapController::class, 'getRoadMapDetail']);
    Route::put('/roadmap/score/{roadmap_id}', [RoadmapController::class, 'updateRoadmapScore']);
    Route::get('/generate-schedule/roadmaps', [RoadmapController::class, 'getRoadMap']);
    Route::apiResource('schedule', 'ScheduleController');
});

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::apiResource('schedule', 'ScheduleController');
});
