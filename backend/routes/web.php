<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\ScheduleController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('api/v1/schedule', [ScheduleController::class,'generateSchedule']);
