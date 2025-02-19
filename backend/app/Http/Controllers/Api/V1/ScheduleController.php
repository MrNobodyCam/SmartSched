<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Schedule;
use App\Models\Roadmap;
use App\Models\Topic;
use App\Models\Generator;
use App\Models\User;

class ScheduleController extends Controller
{
    public function generateSchedule(Request $request)
    {
        $apiKey = env('GOOGLE_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key={$apiKey}";

        $currentDate = Carbon::now()->format('Y-m-d');
        $textPrompt = $request->input('text_prompt', 'Give me a schedule for learning Laravel starting from ' . $currentDate);

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
                            'type' => 'array',
                            'items' => [
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
                                                'time' => [
                                                    'type' => 'object',
                                                    'properties' => [
                                                        'hour' => [
                                                            'type' => 'integer'
                                                        ],
                                                        'minute' => [
                                                            'type' => 'integer'
                                                        ]
                                                    ],
                                                    'required' => [
                                                        'hour',
                                                        'minute'
                                                    ]
                                                ]
                                            ],
                                            'required' => [
                                                'lesson',
                                                'description',
                                                'time'
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

        if (isset($scheduleData['schedule'])) {
            foreach ($scheduleData['schedule'] as $item) {
                $startDate = Carbon::create($item['start_date']['year'], $item['start_date']['month'], $item['start_date']['day']);
                $endDate = Carbon::create($item['end_date']['year'], $item['end_date']['month'], $item['end_date']['day']);

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
                    'schedule_title' => $item['title'],
                    'free_time' => '10:00',
                    'start_time' => '08:00',
                    'end_time' => '17:00'
                ]);

                $schedule = Schedule::create([
                    'generator_id' => $generator->id,
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ]);

                foreach ($item['roadmap'] as $roadmapItem) {
                    $topic = Topic::firstOrCreate([
                        'title' => $roadmapItem['lesson'],
                    ]);

                    Roadmap::create([
                        'schedule_id' => $schedule->id,
                        'topic_id' => $topic->id,
                        'lesson' => $roadmapItem['lesson'],
                        'description' => $roadmapItem['description'],
                        'date' => $startDate,
                        'time' => Carbon::createFromTime($roadmapItem['time']['hour'], $roadmapItem['time']['minute']),
                    ]);
                }
            }
        } else {
            return response()->json(['error' => 'Schedule data not found in the response'], 400);
        }

        return response()->json($scheduleData);
    }

    public function show($id)
    {
        $schedule = Schedule::with(['generator.user', 'roadmaps.topic'])->find($id);

        if (!$schedule) {
            return response()->json(['error' => 'Schedule not found'], 404);
        }

        $response = [
            // 'id' => $schedule->id,
            'title' => $schedule->generator->schedule_title,
            'start_date' => $schedule->start_date,
            'end_date' => $schedule->end_date,
            'roadmap' => $schedule->roadmaps->map(function ($roadmap) {
                return [
                    'lesson' => $roadmap->lesson,
                    'description' => $roadmap->description,
                    'date' => $roadmap->date,
                    'time' => $roadmap->time,
                    'topic' => $roadmap->topic->title,
                ];
            }),
            // 'user' => [
            //     'id' => $schedule->generator->user->id,
            //     'full_name' => $schedule->generator->user->full_name,
            //     'email' => $schedule->generator->user->email,
            // ],
        ];

        return response()->json($response);
    }
}
