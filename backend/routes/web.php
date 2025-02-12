<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ScheduleController;
use App\Http\Controllers\Api\V1\QuizController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/v1/schedule', [ScheduleController::class,'generateSchedule']);
Route::get('api/v1/quiz', [QuizController::class,'generateQuiz']);
