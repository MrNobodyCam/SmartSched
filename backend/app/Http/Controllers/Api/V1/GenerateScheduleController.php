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
use Illuminate\Support\Facades\DB;

class GenerateScheduleController extends Controller
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
        $duration = $request->input('duration');
        $user_id = $request->input('id');
        // Ensure the user exists
        $user = User::find($user_id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $countUserSchedule = DB::table('schedules')->where('user_id', $user->id)->count('id');

        $generator = Generator::create([
            'generator_number' => $countUserSchedule + 1,
            'user_id' => $user->id,
            'schedule_title' => $scheduleTitle,
            'free_day' => $freeDays,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'duration' => $duration,
        ]);

        // Get subjects and free days as arrays for our algorithm
        $subjects = $request->input('subject');
        $freeDaysArray = $request->input('free_day');
        $durationWeeks = (int)$duration;

        // Calculate start and end dates
        $firstFreeDay = reset($freeDaysArray);
        $startDate = Carbon::now()->next(ucfirst($firstFreeDay));
        $endDate = (clone $startDate)->addWeeks($durationWeeks);
        $firstFreeDayDate = $startDate->format('jS F Y');

        $textPrompt = "Create a structured study schedule with the following details:\n" .
            "Title: " . $scheduleTitle . "\n" .
            "Subjects: " . $subject . "\n" .
            "Study Days: " . $freeDays . "\n" .
            "Study Time: " . $startTime . " - " . $endTime . "\n" .
            "Start Date: " . $firstFreeDayDate . "\n" .
            "Duration: " . $duration . " weeks\n\n" .
            "Guidelines:\n" .
            "- Each study session should be 1 hour and 30 minutes long, followed by a 15-minute break.\n" .
            "- The schedule should be organized by week, with each week starting on the first free day.\n" .
            "- Each study session should include a lesson and a brief description.\n" .
            "- Each lesson should be the title of the subject being studied.\n" .
            "- The description should be a brief overview of the lesson in minimum 50 words.\n" .
            "- Provide a structured weekly breakdown for effective learning.\n" .
            "- Ensure each study session fits within the allocated time slots.\n";


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

            // Create schedule with our calculated dates
            $schedule = Schedule::create([
                'user_id' => $user->id,
                'schedule_number' => $countUserSchedule + 1,
                // 'generator_id' => $generator->id,
                'generator_number' => $countUserSchedule + 1,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

            // Use our custom scheduling function instead of the AI-generated dates
            $this->createCustomSchedule(
                $schedule,
                $generator,
                $subjects,
                $freeDaysArray,
                $startDate,
                $durationWeeks,
                $startTime,
                $endTime,
                $scheduleData['roadmap']
            );
            $schedule_title = DB::table('generators')
                ->where('generator_number', $countUserSchedule + 1)
                ->where('user_id', $user->id)
                ->value('schedule_title');
            DB::table('schedule_notifications')->insert([
                'user_id' => $user_id,
                'schedule_number' =>  $countUserSchedule + 1,
                'roadmap_number' => null,
                'notification_type' => 'schedule_generated',
                'title' => 'Schedule Created Successfully: ' . $schedule_title,
                'message' => 'Your schedule "' . $schedule_title . '"  has been successfully generated. Stay committed and make progress toward your goals!',
                'type' => 'success',
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            return new ScheduleResource($schedule);
        } else {
            return response()->json(['error' => 'Schedule data not found in the response'], 400);
        }
    }

    /**
     * Create a custom schedule based on user's free days
     * 
     * @param Schedule $schedule The schedule model instance
     * @param Generator $generator The generator model instance
     * @param array $subjects List of subjects to study
     * @param array $freeDays List of days the user is free to study
     * @param Carbon $startDate The start date of the schedule
     * @param int $durationWeeks Number of weeks for the schedule
     * @param string $startTime Daily start time
     * @param string $endTime Daily end time
     * @param array $roadmapContent Content suggestions from AI
     * @return void
     */
    private function createCustomSchedule($schedule, $generator, $subjects, $freeDays, $startDate, $durationWeeks, $startTime, $endTime, $roadmapContent)
    {
        // Map day names to their numeric values (0 = Sunday, 1 = Monday, etc.)
        $dayMapping = [
            'sunday' => 0,
            'monday' => 1,
            'tuesday' => 2,
            'wednesday' => 3,
            'thursday' => 4,
            'friday' => 5,
            'saturday' => 6,
        ];

        // Convert free day names to day numbers for easier date calculation
        $freeDayNumbers = [];
        foreach ($freeDays as $day) {
            $freeDayNumbers[] = $dayMapping[strtolower($day)];
        }

        // Organize roadmap content by subject
        $subjectContent = [];
        foreach ($roadmapContent as $item) {
            $subject = $item['lesson'];
            if (!isset($subjectContent[$subject])) {
                $subjectContent[$subject] = [];
            }
            $subjectContent[$subject][] = [
                'description' => $item['description'],
                'lesson' => $item['lesson']
            ];
        }

        // Create topics and associate with generator
        $topicMap = [];
        foreach ($subjects as $subject) {
            $topic = Topic::firstOrCreate(['title' => $subject]);
            GeneratorTopic::create([
                'generator_id' => $generator->id,
                'topic_id' => $topic->id,
            ]);
            $topicMap[$subject] = $topic->id;
        }

        // Parse daily time boundaries
        $dailyEndTime = Carbon::parse($endTime);
        $sessionDuration = 90; // Duration in minutes
        $breakDuration = 15; // Break duration in minutes
        $roadmapId = 1;
        // Schedule creation
        $currentDate = clone $startDate;
        $endDateLimit = (clone $startDate)->addWeeks($durationWeeks);
        $subjectIndex = 0; // Start with the first subject
        $contentIndices = array_fill_keys($subjects, 0); // Track content index for each subject

        // Continue scheduling until we reach the end date
        while ($currentDate->lessThan($endDateLimit)) {
            // Skip days that are not free days
            if (!in_array($currentDate->dayOfWeek, $freeDayNumbers)) {
                $currentDate->addDay();
                continue;
            }

            // Start time for this day
            $currentSlotStart = Carbon::parse($startTime)->setDateFrom($currentDate);

            // Create sessions until we reach the end time for this day
            while (true) {
                $currentSlotEnd = (clone $currentSlotStart)->addMinutes($sessionDuration);

                // If there's not enough time for another session, move to the next day
                if ($currentSlotEnd->greaterThan(Carbon::parse($endTime)->setDateFrom($currentDate))) {
                    break;
                }

                $subject = $subjects[$subjectIndex];

                // Get content for this subject
                $content = $subjectContent[$subject] ?? [];
                $contentCount = count($content);

                // Get content for this session (cycle through if we run out)
                if ($contentCount > 0) {
                    $contentIndex = $contentIndices[$subject] % $contentCount;
                    $sessionContent = $content[$contentIndex];
                    $contentIndices[$subject]++; // Move to next content piece for this subject
                } else {
                    $sessionContent = ['description' => "Study session for $subject", 'lesson' => $subject];
                }

                // Create roadmap entry with fixed 1h30m duration
                Roadmap::create([
                    'topic_id' => $topicMap[$subject],
                    'schedule_id' => $schedule->id,
                    'roadmap_number' => $roadmapId,
                    // 'user_id' => $schedule->user_id,
                    // 'schedule_number' => $schedule->schedule_number,
                    'lesson' => $subject,
                    'description' => $sessionContent['description'],
                    'date' => clone $currentDate,
                    'start_time' => $currentSlotStart,
                    'end_time' => $currentSlotEnd,
                    'result' => null,
                ]);
                $roadmapId++;
                // Move to next subject in rotation
                $subjectIndex = ($subjectIndex + 1) % count($subjects);

                // The next slot starts after a 15-minute break
                $currentSlotStart = (clone $currentSlotEnd)->addMinutes($breakDuration);
            }

            // Move to next day
            $currentDate->addDay();
        }
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
