<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Telegram\Bot\Laravel\Facades\Telegram;

class TelegramBotController extends Controller
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

    public function getUpdates() {
        $updates = Telegram::getUpdates();
        return $updates;
    }

    public function registorTelegramBot(Request $request) {
        $chatId = $request->input('chat_id');
        $emailId = $request->input('email');

        if (!$chatId || !$emailId) {
            return response()->json(['error' => 'Chat ID and Email are required'], 400);
        }

        $user = User::where('email', $emailId)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->telegram_chat_id = $chatId;
        $user->save();

        return response()->json(['message' => 'Telegram bot registered successfully!', 'success' => true]);
    }
}
