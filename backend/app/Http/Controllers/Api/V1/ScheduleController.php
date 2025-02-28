<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Schedule;
use App\Models\Roadmap;
use App\Models\Topic;
use App\Models\Generator;
use App\Models\User;
use App\Models\GeneratorTopic;
use App\Http\Resources\ScheduleResource;

class ScheduleController extends Controller
{
    public function store(Request $request)
    {
        $apiKey = env('GOOGLE_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key={$apiKey}";

        // Ensure the user exists
        $user = User::updateOrCreate(
            ['email' => 'example@gmail.com'],
            [
                'full_name' => 'John Doe',
                'gender' => 'male',
                'time_zone' => 'UTC',
                'hash_password' => bcrypt('password')
            ]
        );

        $generator = Generator::create([
            'user_id' => $user->id,
            'schedule_title' => $request->input('schedule_title'),
            'free_day' => implode(", ", $request->input('free_day')),
            'start_time' => $request->input('start_time'),
            'end_time' => $request->input('end_time'),
        ]);

        $currentDate = Carbon::now()->format('d-m-Y');
        $textPrompt = "Generate a schedule for a student with the following information: " .
            "Schedule Title: {$request->input('schedule_title')}, " .
            "Subjects: " . implode(", ", $request->input('subject')) . ", " .
            "Today's date is {$currentDate}. " .
            "The schedule should start on the following days: " . implode(", ", $request->input('free_day')) . ", " .
            "starting from " . $request->input('start_time') . " to " . $request->input('end_time') . " next week.";

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->timeout(60)->post($url, [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $textPrompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'response_mime_type' => 'application/json',
                'response_schema' => [
                    'type' => 'object',
                    'properties' => [
                        'schedule' => [
                            'type' => 'object',
                            'properties' => [
                                'roadmap' => [
                                    'type' => 'array',
                                    'items' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'lesson' => [
                                                'type' => 'string'
                                            ],
                                            'description' => [
                                                'type' => 'string'
                                            ],
                                            'date' => [
                                                'type' => 'object',
                                                'properties' => [
                                                    'hour' => [
                                                        'type' => 'integer'
                                                    ],
                                                    'minute' => [
                                                        'type' => 'integer'
                                                    ],
                                                    'day' => [
                                                        'type' => 'integer'
                                                    ],
                                                    'month' => [
                                                        'type' => 'integer'
                                                    ],
                                                    'year' => [
                                                        'type' => 'integer'
                                                    ]
                                                ],
                                                'required' => [
                                                    'hour',
                                                    'minute',
                                                    'day',
                                                    'month',
                                                    'year'
                                                ]
                                            ]
                                        ],
                                        'required' => [
                                            'lesson',
                                            'description',
                                            'date'
                                        ]
                                    ]
                                ],
                                'start_date' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'day' => [
                                            'type' => 'integer'
                                        ],
                                        'month' => [
                                            'type' => 'integer'
                                        ],
                                        'year' => [
                                            'type' => 'integer'
                                        ]
                                    ],
                                    'required' => [
                                        'day',
                                        'month',
                                        'year'
                                    ]
                                ],
                                'end_date' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'day' => [
                                            'type' => 'integer'
                                        ],
                                        'month' => [
                                            'type' => 'integer'
                                        ],
                                        'year' => [
                                            'type' => 'integer'
                                        ]
                                    ],
                                    'required' => [
                                        'day',
                                        'month',
                                        'year'
                                    ]
                                ],
                                'title' => [
                                    'type' => 'string'
                                ]
                            ],
                            'required' => [
                                'roadmap',
                                'start_date',
                                'end_date',
                                'title'
                            ]
                        ]
                    ],
                    'required' => [
                        'schedule'
                    ]
                ]
            ]
        ]);

        $responseData = $response->json();

        if (!isset($responseData['candidates']) || !isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
            return response()->json(['error' => 'Invalid response from the API'], 400);
        }

        $textContent = $responseData['candidates'][0]['content']['parts'][0]['text'];
        $scheduleData = json_decode($textContent, true);

        // dd($scheduleData);

        if (isset($scheduleData['schedule'])) {
            $scheduleData = $scheduleData['schedule'];
            $startDate = Carbon::create($scheduleData['start_date']['year'], $scheduleData['start_date']['month'], $scheduleData['start_date']['day']);
            $endDate = Carbon::create($scheduleData['end_date']['year'], $scheduleData['end_date']['month'], $scheduleData['end_date']['day']);

            $schedule = Schedule::create([
                'generator_id' => $generator->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

            for ($i = 0; $i < count($request->input('subject')); $i++) {
                $topic = Topic::firstOrCreate([
                    'title' => $request->input('subject')[$i],
                ]);
                $generatorTopic = GeneratorTopic::create([
                    'generator_id' => $generator->id,
                    'topic_id' => $topic->id,
                ]);

                foreach ($scheduleData['roadmap'] as $roadmapItem) {
                    Roadmap::create([
                        'schedule_id' => $schedule->id,
                        'topic_id' => $topic->id,
                        'lesson' => $roadmapItem['lesson'],
                        'description' => $roadmapItem['description'],
                        'date' => Carbon::create($roadmapItem['date']['year'], $roadmapItem['date']['month'], $roadmapItem['date']['day']),
                        'time' => Carbon::createFromTime($roadmapItem['date']['hour'], $roadmapItem['date']['minute']),
                        'result' => 0,
                    ]);
                }
            }
        } else {
            return response()->json(['error' => 'Schedule data not found in the response'], 400);
        }

        return new ScheduleResource($schedule);
    }

    public function show($id)
    {
        $schedule = Schedule::with(['generator.user', 'roadmaps.topic'])->find($id);

        if (!$schedule) {
            return response()->json(['error' => 'Schedule not found'], 404);
        }

        return new ScheduleResource($schedule);
    }

    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if (!$schedule) {
            return response()->json(['error' => 'Schedule not found'], 404);
        }

        $schedule->delete();
        return response()->json(['message' => 'Schedule deleted successfully']);
    }
}
