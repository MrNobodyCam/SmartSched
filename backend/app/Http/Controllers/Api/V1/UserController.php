<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $user = DB::table('users')
            ->select('full_name', 'gender', 'email', 'time_zone')
            ->where('id', $user_id)
            ->first();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }
    public function editUser(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'full_name' => 'required|string',
            'email' => 'required|string',
            'gender' => 'required|string',
            'time_zone' => 'required|string'
        ]);
        $user_id = $request->id;
        $user = DB::table('users')
            ->where('id', $user_id)
            ->update([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'gender' => $request->gender,
                'time_zone' => $request->time_zone
            ]);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json(['message' => 'User updated successfully']);
    }

    public function checkUserExists(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;

        $user = DB::table('users')
            ->where('id', $user_id)
            ->first();

        if ($user) {
            return response()->json(['exists' => true]);
        } else {
            return response()->json(['exists' => false]);
        }
    }

    public function getUserEmail(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $user = DB::table('users')
            ->select('email')
            ->where('id', $user_id)
            ->first();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json($user);
    }
}
