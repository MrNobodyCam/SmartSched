<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function generateQuiz(Request $request)
    {
        $request->validate(
            ['roadmap_id' => 'required|integer'],
        );
        $roadmap_id = $request->input('roadmap_id');
        $lesson = DB::table('roadmaps')->where('id', operator: $roadmap_id)->value('description');
        if (!$lesson) {
            return response()->json(['error' => 'Lesson not found'], 404);
        }

        $apiKey = env('GOOGLE_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key={$apiKey}";

        $textPrompt = $request->input(
            'text_prompt',
            "Generate a multiple-choice quiz (QCM) with 10 questions. Each question should have exactly 4 answer choices. 
            Randomly assign one of the four answers as 'is_correct': true, ensuring it's not always the first option. 
            The remaining 3 answers must have 'is_correct': false. 
            The quiz should be based on the topic: " . $lesson
        );



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
                        'quiz' => [
                            'type' => 'array',
                            'items' => [
                                'type' => 'object',
                                'properties' => [
                                    'question' => [
                                        'type' => 'string'
                                    ],
                                    'multi-answer' => [
                                        'type' => 'array',
                                        'items' => [
                                            'type' => 'object',
                                            'properties' => [
                                                'answer' => [
                                                    'type' => 'string'
                                                ],
                                                'is_correct' => [
                                                    'type' => 'boolean'
                                                ]
                                            ],
                                            'required' => [
                                                'answer',
                                                'is_correct'
                                            ]
                                        ]
                                    ]
                                ],
                                'required' => [
                                    'question',
                                    'multi-answer'
                                ]
                            ]
                        ]
                    ],
                    'required' => [
                        'quiz'
                    ]
                ]
            ]
        ]);

        $textContent = $response->json()['candidates'][0]['content']['parts'][0]['text'];
        $quizData = json_decode($textContent, true);

        // if (isset($quizData['quiz'])) {
        //     foreach ($quizData['quiz'] as $quizItem) {
        //         DB::table('quizzes')->insert([
        //             'question' => $quizItem['question'],
        //             'roadmap_id' => 1,
        //             'created_at' => now(),
        //             'updated_at' => now(),
        //         ]);
        //         $question = DB::table('quizzes')->where('question', $quizItem['question'])->value('id');
        //         foreach ($quizItem['multi-answer'] as $answerItem) {
        //             DB::table('answers')->insert([
        //                 'answer' => $answerItem['answer'],
        //                 'is_correct' => $answerItem['is_correct'],
        //                 'quiz_id' => $question,
        //                 'created_at' => now(),
        //                 'updated_at' => now(),
        //             ]);
        //         }
        //     }
        // } else {
        //     return response()->json(['error' => 'Quiz data not found in the response'], 400);
        // }

        return response()->json($quizData);
    }

    public function getQuizzes($id)
    {
        $quizzes = DB::table('quizzes')
            ->where('id', $id)->select('question')->get();
        $answers = DB::table('answers')
            ->where('quiz_id', $id)->select('answer')->get();
        $responses = [];
        foreach ($quizzes as $quiz) {
            $responses[] = [
                'question' => $quiz->question,
                'multi_answers' => [
                    $answers
                ],
            ];
        }


        if ($quizzes->isEmpty()) {
            return response()->json(['error' => 'Quiz not found'], 404);
        }

        return $responses;
    }
}
