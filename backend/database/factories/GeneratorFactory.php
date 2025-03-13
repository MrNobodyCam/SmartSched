<?php

namespace Database\Factories;

use App\Models\Generator;
use Illuminate\Database\Eloquent\Factories\Factory;

class GeneratorFactory extends Factory
{
    protected $model = Generator::class;

    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'schedule_title' => $this->faker->sentence,
            'free_time' => '10:00',
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];
    }
}