<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NotificationController extends Controller
{
    function getNotification(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $now = Carbon::now();

        $activeSchedule = DB::table('schedules')
            ->where('status', 'active')
            ->where('user_id', $user_id)
            ->first();

        // if (!$activeSchedule) {
        //     return response()->json(['error' => 'No active schedule found'], 404);
        // }

        $roadmaps = DB::table('roadmaps')
            ->join('schedules', 'roadmaps.schedule_id', '=', 'schedules.id')
            ->where('schedules.user_id', $user_id)
            ->where('schedules.status', 'active')
            ->whereRaw("STR_TO_DATE(CONCAT(roadmaps.date, ' ', roadmaps.start_time), '%Y-%m-%d %H:%i:%s') <= ?", [$now])
            ->select(
                'roadmaps.roadmap_number',
                'roadmaps.start_time',
                'roadmaps.end_time',
                'roadmaps.date',
                'schedules.schedule_number',
                'roadmaps.lesson',
                'roadmaps.description',
                'roadmaps.result'
            )
            ->get();
        foreach ($roadmaps as $roadmap) {
            $exists = DB::table('schedule_notifications')
                ->where('user_id', $user_id)
                ->where('schedule_number', $roadmap->schedule_number)
                ->where('roadmap_number', $roadmap->roadmap_number)
                ->exists();

            if (!$exists) {
                DB::table('schedule_notifications')->insert([
                    'user_id' => $user_id,
                    'schedule_number' => $activeSchedule->schedule_number,
                    'roadmap_number' => $roadmap->roadmap_number,
                    'notification_type' => 'time_study',
                    'title' => 'Time to Study: ' . $roadmap->lesson,
                    'message' => 'It\'s time for your scheduled study session on ' . $roadmap->lesson . '! Stay focused and make progress on your learning journey.',
                    'type' => 'info',
                    'is_read' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // if ($roadmaps->isEmpty()) {
        //     return response()->json(['message' => 'No roadmaps found for the current time'], 404);
        // }

        $notifications = DB::table('schedule_notifications')
            ->where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->select(
                'id',
                'title',
                'message',
                'type',
                'is_read',
                'created_at'
            )
            ->get()
            ->map(function ($notification) {
                $notification->timestamp = Carbon::parse($notification->created_at)->format('d M Y \a\t g:i a');
                unset($notification->created_at);
                return $notification;
            });
        $countUnread = DB::table('schedule_notifications')
            ->where('user_id', $user_id)
            ->where('is_read', false)
            ->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $countUnread
        ], 200);
    }
    function markAsRead(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'notification_id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $notification_id = $request->input('notification_id');

        $notification = DB::table('schedule_notifications')
            ->where('user_id', $user_id)
            ->where('id', $notification_id)
            ->first();

        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }

        DB::table('schedule_notifications')
            ->where('user_id', $user_id)
            ->where('id', $notification_id)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read successfully']);
    }
    function markAllAsRead(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;

        DB::table('schedule_notifications')
            ->where('user_id', $user_id)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read successfully']);
    }
}
