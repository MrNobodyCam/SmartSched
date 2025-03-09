<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\TestController;
use App\Http\Controllers\Api\V1\ScheduleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// // Group routes with prefix 'v1'
// Route::group(['prefix' => 'v1'], function () {
//     Route::post('schedule/generate', [ScheduleController::class, 'generateSchedule']);
//     Route::get('schedule/{id}', [ScheduleController::class, 'show']);
//     Route::delete('schedule/{id}', [ScheduleController::class, 'destroy']);
// });

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\Api\V1'], function () {
    Route::apiResource('schedule', 'ScheduleController');
});
