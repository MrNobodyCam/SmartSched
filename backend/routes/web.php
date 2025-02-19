<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ScheduleController;
use App\Http\Controllers\Api\V1\QuizController;
use App\Http\Controllers\Api\V1\RoadmapController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/v1/schedule', [ScheduleController::class,'generateSchedule']);
Route::get('api/v1/schedule/{id}', [ScheduleController::class,'show']);
