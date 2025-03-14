<?php

namespace Database\Factories;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ScheduleFactory extends Factory
{
    protected $model = Schedule::class;

    public function definition()
    {
        return [
            'generator_id' => \App\Models\Generator::factory(),
            'start_date' => Carbon::now(),
            'end_date' => Carbon::now()->addDays(30),
        ];
    }
}