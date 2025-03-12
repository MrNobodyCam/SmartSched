<?php

namespace Database\Factories;

use App\Models\Roadmap;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoadmapFactory extends Factory
{
    protected $model = Roadmap::class;

    public function definition()
    {
        return [
            'schedule_id' => \App\Models\Schedule::factory(),
            'topic_id' => \App\Models\Topic::factory(),
            'lesson' => $this->faker->sentence,
            'description' => $this->faker->text(255),
            'time' => $this->faker->time,
            'date' => $this->faker->date,
        ];
    }
}