<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Generator;

class GeneratorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Generator::factory(10)->create();
    }
}