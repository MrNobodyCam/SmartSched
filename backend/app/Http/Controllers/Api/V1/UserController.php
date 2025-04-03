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
            ->select('full_name', 'gender', 'email', 'time_zone', 'hash_password')
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
            'email' => 'required|email',
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

    public function deleteUser($id)
    {

        $user = DB::table('users')
            ->where('id', $id)
            ->delete();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function changePassword(Request $request)
    {
        // Validate the request
        $request->validate([
            'id' => 'required|integer',
            'old_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
            'new_password_confirmation' => 'required|string|min:8',
        ]);

        $user_id = $request->id;
        $user = DB::table('users')
            ->where('id', $user_id)
            ->first();
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        if ($request->new_password !== $request->new_password_confirmation) {
            return response()->json(['error' => 'New password and confirmation do not match'], 400);
        }
        if (!password_verify($request->old_password, $user->hash_password)) {
            return response()->json(['error' => 'Old password is incorrect'], 400);
        }
        $hashedPassword = password_hash($request->new_password, PASSWORD_BCRYPT);
        DB::table('users')
            ->where('id', $user_id)
            ->update(['hash_password' => $hashedPassword]);
        return response()->json(['message' => 'Password changed successfully']);
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
