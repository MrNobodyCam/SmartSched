<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\RoadmapController;
use App\Http\Controllers\Api\V1\ScheduleController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\OtpController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\ContactController;
use App\Mail\ContactUsMail;

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
    Route::get('/verification/{id}', [OtpController::class, 'verification'])->name('verification');
    Route::post('/verified', [OtpController::class, 'verifiedOtp'])->name('verifiedOtp');
    Route::get('/resend-otp', [OtpController::class, 'resendOtp'])->name('resendOtp');
});

Route::prefix('v1')->group(function () {
    Route::post('/generatequizz', [QuizController::class, 'generateQuiz']);
    Route::get('/quizz/{id}', [QuizController::class, 'getQuizzes']);
    Route::get('/roadmap/detail', [RoadmapController::class, 'getRoadMapDetail']);
    Route::put('/roadmap/score', [RoadmapController::class, 'updateRoadmapScore']);
    Route::get('/generate-schedule/roadmaps', [RoadmapController::class, 'getRoadMap']);
    Route::get('/generate-schedule/end', [ScheduleController::class, 'endSchedule']);
    Route::get('/generate-schedule/procrastinate', [ScheduleController::class, 'scheduleProcrastinate']);
    Route::get('/generate-schedule/continue', [ScheduleController::class, 'continueCourse']);
    Route::post('/history', [RoadmapController::class, 'getHistoryRoadMap']);
    Route::get('/history-schedule', [ScheduleController::class, 'getHistorySchedule']);
    Route::get('/notification', [NotificationController::class, 'getNotification']);
    Route::put('/notification/markAsRead', [NotificationController::class, 'markAsRead']);
    Route::get('/notification/markAllAsRead', [NotificationController::class, 'markAllAsRead']);
    Route::get('/user', [UserController::class, 'getUser']);
    Route::put('/editUser', [UserController::class, 'editUser']);
    Route::get('/getUserEmail', [UserController::class, 'getUserEmail']);

    Route::post('/contactUs', [ContactController::class, 'sendContactMail']);
    Route::get('/check-schedule', [ScheduleController::class, 'checkSchedule']);
    Route::get('/checkSessionLimit', [ScheduleController::class, 'checkSessionLimit']);
    Route::get('/checkSessionRemaining', [ScheduleController::class, 'checkSessionRemaining']);
    Route::get('/checkUserExists', [UserController::class, 'checkUserExists']);
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
