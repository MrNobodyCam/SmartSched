<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramController extends Controller
{
    public function sendMessage(Request $request)
    {
        $chatId = $request->input('chat_id');
        $message = $request->input('message', 'Hello, this is a message from Laravel!'); // Default message if not provided

        if (!$chatId) {
            return response()->json(['error' => 'Chat ID is required'], 400);
        }

        Telegram::sendMessage([
            'chat_id' => $chatId,
            'text' => $message,
        ]);

        return response()->json(['message' => 'Message sent to Telegram!']);
    }
}
