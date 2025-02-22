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
        $lesson = DB::table('roadmaps')->where('id',  1)->value('lesson');
        if (!$lesson) {
            return response()->json(['error' => 'Lesson not found'], 404);
        }
        $apiKey = env('GOOGLE_API_KEY');
        $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key={$apiKey}";

        $textPrompt = $request->input('text_prompt', 'Generate a quiz that have 2 question for ' . $lesson);

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
                                    'multi_answer' => [
                                        'type' => 'object',
                                        'properties' => [
                                            'a' => [
                                                'type' => 'string'
                                            ],
                                            'b' => [
                                                'type' => 'string'
                                            ],
                                            'c' => [
                                                'type' => 'string'
                                            ],
                                            'd' => [
                                                'type' => 'string'
                                            ]
                                        ],
                                        'required' => [
                                            'a',
                                            'b',
                                            'c',
                                            'd'
                                        ]
                                    ],
                                    'correct_answer' => [
                                        'type' => 'string'
                                    ],
                                    'explaination' => [
                                        'type' => 'string'
                                    ]
                                ],
                                'required' => [
                                    'question',
                                    'multi_answer',
                                    'correct_answer',
                                    'explaination'
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

        if (isset($quizData['quiz'])) {
            // Process the quiz data as needed
        } else {
            return response()->json(['error' => 'Quiz data not found in the response'], 400);
        }

        return response()->json($quizData);
    }
}
