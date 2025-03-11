<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Roadmap;
use App\Models\Schedule;
use App\Models\Topic;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Insert topics
        $logicTopic = Topic::create([
            'title' => 'Logic',
        ]);

        $reactTopic = Topic::create([
            'title' => 'React JS',
        ]);

        $laravelTopic = Topic::create([
            'title' => 'Laravel',
        ]);

        $vueTopic = Topic::create([
            'title' => 'Vue JS',
        ]);

        $angularTopic = Topic::create([
            'title' => 'Angular',
        ]);

        $nodeTopic = Topic::create([
            'title' => 'Node JS',
        ]);

        $pythonTopic = Topic::create([
            'title' => 'Python',
        ]);

        $javaTopic = Topic::create([
            'title' => 'Java',
        ]);

        $csharpTopic = Topic::create([
            'title' => 'C#',
        ]);

        $phpTopic = Topic::create([
            'title' => 'PHP',
        ]);

        Schedule::create([
            'user_id' => 1,
            'generator_id' => 1,
            'status' => 'active',
            'start_date' => '2025-03-01',
            'end_date' => '2025-03-31',
        ]);
        Schedule::create([
            'user_id' => 2,
            'generator_id' => 1,
            'status' => 'end',
            'start_date' => '2025-03-01',
            'end_date' => '2025-03-31',
        ]);
        Roadmap::create([
            'topic_id' => $logicTopic->id,
            'schedule_id' => 1,
            'lesson' => 'Introduction to Logic',
            'description' => 'Introduction to Logic involves understanding reasoning, argument structures, deductive and inductive reasoning, truth tables, logical fallacies, and how to evaluate statements for validity and soundness.',
            'start_time' => '11:20:09',
            'end_time' => '15:20:09',
            'date' => '2025-03-06',
        ]);

        Roadmap::create([
            'topic_id' => $reactTopic->id,
            'schedule_id' => 1,
            'lesson' => 'Introduction to React Js',
            'description' => 'Learn React\'s component-based architecture, JSX, props, state, event handling, useState, useEffect, React Router for navigation, and Context API for state management to build dynamic and interactive applications.',
            'start_time' => '11:20:09',
            'end_time' => '15:20:09',
            'date' => '2025-03-06',
        ]);

        Roadmap::create([
            'topic_id' => $laravelTopic->id,
            'schedule_id' => 1,
            'lesson' => 'Introduction to Laravel',
            'description' => 'Learn the basics of Laravel, including routing, controllers, views, Blade templating, Eloquent ORM, migrations, and middleware to build robust web applications.',
            'start_time' => '10:00:00',
            'end_time' => '12:00:00',
            'date' => '2025-03-07',
        ]);

        Roadmap::create([
            'topic_id' => $vueTopic->id,
            'schedule_id' => 1,
            'lesson' => 'Introduction to Vue JS',
            'description' => 'Learn Vue.js, a progressive JavaScript framework for building user interfaces, including Vue components, directives, Vue Router, Vuex for state management, and single-file components.',
            'start_time' => '13:00:00',
            'end_time' => '15:00:00',
            'date' => '2025-03-07',
        ]);

        Roadmap::create([
            'topic_id' => $angularTopic->id,
            'schedule_id' => 2,
            'lesson' => 'Introduction to Angular',
            'description' => 'Learn Angular, a platform for building mobile and desktop web applications, including components, modules, services, dependency injection, and Angular CLI.',
            'start_time' => '09:00:00',
            'end_time' => '11:00:00',
            'date' => '2025-03-08',
        ]);

        Roadmap::create([
            'topic_id' => $nodeTopic->id,
            'schedule_id' => 2,
            'lesson' => 'Introduction to Node JS',
            'description' => 'Learn Node.js, a JavaScript runtime built on Chrome\'s V8 JavaScript engine, including modules, event-driven architecture, Express.js, and building RESTful APIs.',
            'start_time' => '14:00:00',
            'end_time' => '16:00:00',
            'date' => '2025-03-08',
        ]);

        Roadmap::create([
            'topic_id' => $pythonTopic->id,
            'schedule_id' => 2,
            'lesson' => 'Introduction to Python',
            'description' => 'Learn Python, a versatile programming language, including syntax, data structures, functions, modules, file handling, and libraries like NumPy and Pandas for data analysis.',
            'start_time' => '10:00:00',
            'end_time' => '12:00:00',
            'date' => '2025-03-09',
        ]);

        Roadmap::create([
            'topic_id' => $javaTopic->id,
            'schedule_id' => 2,
            'lesson' => 'Introduction to Java',
            'description' => 'Learn Java, a high-level programming language, including object-oriented programming, classes, inheritance, polymorphism, interfaces, and building applications with Java SE.',
            'start_time' => '13:00:00',
            'end_time' => '15:00:00',
            'date' => '2025-03-09',
        ]);

        Roadmap::create([
            'topic_id' => $csharpTopic->id,
            'schedule_id' => 2,
            'lesson' => 'Introduction to C#',
            'description' => 'Learn C#, a modern programming language, including syntax, data types, control structures, object-oriented programming, LINQ, and building applications with .NET.',
            'start_time' => '09:00:00',
            'end_time' => '11:00:00',
            'date' => '2025-03-10',
        ]);

        Roadmap::create([
            'topic_id' => $phpTopic->id,
            'schedule_id' => 2,
            'lesson' => 'Introduction to PHP',
            'description' => 'Learn PHP, a popular server-side scripting language, including syntax, variables, control structures, functions, form handling, sessions, and building dynamic web applications.',
            'start_time' => '14:00:00',
            'end_time' => '16:00:00',
            'date' => '2025-03-10',
        ]);
    }
}
