<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name'      => 'required|string|max:255',
            'email'     => 'required|string|max:255|unique:users',
            'hash_password'  => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'full_name'      => $request->full_name,
            'email'     => $request->email,
            'hash_password'  => Hash::make($request->hash_password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'data'          => $user,
            'access_token'  => $token,
            'token_type'    => 'Bearer'
        ]);
    }

    public function signin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|max:255',
            'hash_password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        // Find the user first to debug
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'User with this email not found'
            ], 401);
        }

        // Manually verify password
        if (!Hash::check($request->hash_password, $user->hash_password)) {
            return response()->json([
                'message' => 'Invalid password'
            ], 401);
        }

        // Login was successful, generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return response()->json([
            'message' => 'Logout successfull'
        ]);
    }
}
