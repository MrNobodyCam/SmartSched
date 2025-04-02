<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactUsMail;

class ContactController extends Controller
{
    public function sendContactMail(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'text' => 'required|string|max:1000',
        ]);

        
        $title = $request->input('title');
        $email = $request->input('email');
        $text = $request->input('text');        

        Mail::to(env('MAIL_TO'))->send(new ContactUsMail($title, $email, $text));

        return response()->json(['message' => 'Mail sent successfully'], 200);
    }
}