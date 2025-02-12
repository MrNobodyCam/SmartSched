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
                                        'type' => 'object',
                                        'properties' => [
                                            'lesson' => [
                                                'type' => 'string'
                                            ],
                                            'description' => [
                                                'type' => 'string'
                                            ]
                                        ],
                                        'required' => [
                                            'lesson',
                                            'description'
                                        ]
                                    ],
                                    'date' => [
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
                                    'time' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'hour' => [
                                                'type' => 'integer'
                                            ],
                                            'minute' => [
                                                'type' => 'integer'
                                            ]
                                        ]
                                    ]
                                ],
                                'required' => [
                                    'roadmap',
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
                        ]
                    ],
                    'required' => [
                        'schedule',
                        'start_date',
                        'end_date'
                    ]
                ]
            ]
        ]);
        
        $textContent = $response->json()['candidates'][0]['content']['parts'][0]['text'];
        $scheduleData = json_decode($textContent, true);

        if (isset($scheduleData['schedule'])) {

            Schedule::create([
                'start_date' => Carbon::create($scheduleData['start_date']['year'], $scheduleData['start_date']['month'], $scheduleData['start_date']['day']),
                'end_date' => Carbon::create($scheduleData['end_date']['year'], $scheduleData['end_date']['month'], $scheduleData['end_date']['day']),
            ]);

            foreach ($scheduleData['schedule'] as $item) {
                $topic = Topic::firstOrCreate([
                    'lesson' => $item['roadmap']['lesson'],
                    'description' => $item['roadmap']['description']
                ]);

                $roadmap = Roadmap::create([
                    'lesson' => $item['roadmap']['lesson'],
                    'date' => Carbon::create($item['date']['year'], $item['date']['month'], $item['date']['day']),
                    'time' => Carbon::createFromTime($item['time']['hour'], $item['time']['minute']),
                    'topic_id' => $topic->id
                ]);
            }
        } else {
            return response()->json(['error' => 'Schedule data not found in the response'], 400);
        }

        return response()->json($scheduleData);
    }
}
