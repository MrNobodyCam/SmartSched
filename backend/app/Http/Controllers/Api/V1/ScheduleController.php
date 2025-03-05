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

        $scheduleTitle = $request->input('schedule_title');
        $subject = implode(", ", $request->input('subject'));
        $freeDays = implode(", ", $request->input('free_day'));
        $startTime = $request->input('start_time');
        $endTime = $request->input('end_time');


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
            'schedule_title' => $scheduleTitle,
            'free_day' => $freeDays,
            'start_time' => $startTime,
            'end_time' => $endTime,
        ]);

        $currentDate = Carbon::now()->toDateTimeString();
        $formattedDate = Carbon::now()->format('d/m/Y (l)');

        $freeDaysArray = $request->input('free_day');
        $firstFreeDay = reset($freeDaysArray); 
        $firstFreeDayDate = Carbon::now()->next(ucfirst($firstFreeDay))->format('jS F Y');

        $textPrompt = "Create a structured and well-organized study schedule based on the following details:
            Title: {$scheduleTitle}
            Subjects: {$subject}
            Study Days: {$freeDays}
            Study Time: {$startTime} – {$endTime}
            Today's Date: {$formattedDate}

            Instructions:

            The schedule should start from the next {$firstFreeDay}, {$firstFreeDayDate}.
            Study Days: {$freeDays}.
            Ensure each session includes specific topics and tasks, such as introductory lessons, key concepts, or hands-on mini-projects to reinforce the learning.
            The schedule should be structured with weekly breakdowns, showing the progression of the learning material over time.
            Format the output in a clear and easy-to-follow manner, and ensure the roadmap covers all subjects in a balanced learning approach.
            Each study session should be limited to a maximum of 4 hours per day.
            The study topics should progressively build on previous concepts for smooth learning.

            Return the schedule in JSON format, starting from {$firstFreeDayDate}, with an end date that is approximately 10 weeks after the start date.";

        // dd($textPrompt);

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
                                                'type' => 'string'
                                            ],
                                            'start_time' => [
                                                'type' => 'string'
                                            ],
                                            'end_time' => [
                                                'type' => 'string'
                                            ]
                                        ],
                                        'required' => [
                                            'lesson',
                                            'description',
                                            'date',
                                            'start_time',
                                            'end_time'
                                        ]
                                    ]
                                ],
                                'start_date' => [
                                    'type' => 'string'
                                ],
                                'end_date' => [
                                    'type' => 'string'
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
            $startDate = Carbon::parse($scheduleData['start_date']);
            $endDate = Carbon::parse($scheduleData['end_date']);

            $schedule = Schedule::create([
                'generator_id' => $generator->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

            foreach ($request->input('subject') as $subject) {
                $topic = Topic::firstOrCreate(['title' => $subject]);
                $generatorTopic = GeneratorTopic::create([
                    'generator_id' => $generator->id,
                    'topic_id' => $topic->id,
                ]);

                foreach ($scheduleData['roadmap'] as $roadmapItem) {
                    if ($roadmapItem['lesson'] == $subject) {
                        Roadmap::create([
                            'schedule_id' => $schedule->id,
                            'topic_id' => $topic->id,
                            'lesson' => $roadmapItem['lesson'],
                            'description' => $roadmapItem['description'],
                            'date' => Carbon::parse($roadmapItem['date']),
                            'start_time' => Carbon::parse($roadmapItem['start_time']),
                            'end_time' => Carbon::parse($roadmapItem['end_time']),
                            'result' => 0,
                        ]);
                    }
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
