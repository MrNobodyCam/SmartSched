<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\EmailVerification;
use Illuminate\Support\Facades\Mail;

class OtpController extends Controller
{
    public function sendOtp($user)
    {
        $otp = rand(10000, 99999);
        $time = time();

        EmailVerification::updateOrCreate(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'otp' => $otp,
                'created_at' => $time
            ]
        );

        // Send email via raw mail instead of using a view
        $subject = 'Mail Verification';
        $message = "Dear $user->full_name,

Your One-Time Password (OTP) for verification is:

🔑 $otp

This OTP is valid for 3 minutes. Please do not share this code with anyone for security reasons.

If you did not request this, please ignore this email.

Best regards,
SmartSched Team";

        try {
            Mail::raw($message, function ($mail) use ($user, $subject) {
                $mail->to($user->email)
                    ->subject($subject);
            });

            return true;
        } catch (\Exception $e) {
            \Log::error('Failed to send OTP email: ' . $e->getMessage());
            return false;
        }
    }

    public function verification($id)
    {
        $user = User::where('id', $id)->first();
        if (!$user || $user->is_verified == 1) {
            return response()->json([
                'success' => false,
                'message' => 'User not found or already verified'
            ], 400);
        }

        $emailSent = $this->sendOtp($user); // OTP SEND

        if ($emailSent) {
            return response()->json([
                'success' => true,
                'message' => 'OTP has been sent',
                'id' => $user->id
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send OTP'
            ], 500);
        }
    }

    public function verifiedOtp(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $otpData = EmailVerification::where('email', $request->email)
            ->where('otp', $request->otp)
            ->first();

        if (!$otpData) {
            return response()->json([
                'success' => false,
                'message' => 'You entered wrong OTP'
            ]);
        } else {
            $currentTime = time();
            $time = $otpData->created_at;

            if ($currentTime >= $time && $time >= $currentTime - (90 + 5)) { // 90 seconds
                User::where('id', $user->id)->update([
                    'is_verified' => 1
                ]);

                // Clean up the used OTP
                $otpData->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Email has been verified'
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Your OTP has expired'
                ]);
            }
        }
    }

    public function resendOtp(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }

        $otpData = EmailVerification::where('email', $request->email)->first();

        if ($otpData) {
            $currentTime = time();
            $time = $otpData->created_at;

            if ($currentTime >= $time && $time >= $currentTime - (90 + 5)) { // 90 seconds
                return response()->json([
                    'success' => false,
                    'message' => 'Please try after some time'
                ]);
            }
        }

        $emailSent = $this->sendOtp($user);

        if ($emailSent) {
            return response()->json([
                'success' => true,
                'message' => 'OTP has been sent'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send OTP'
            ], 500);
        }
    }
}
