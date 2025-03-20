<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NotificationController extends Controller
{
    function studyRoadmapTime()
    {
        $user_id = 1;
        $now = Carbon::now();

        $activeSchedule = DB::table('schedules')
            ->where('status', 'active')
            ->where('user_id', $user_id)
            ->first();

        if (!$activeSchedule) {
            return response()->json(['error' => 'No active schedule found'], 404);
        }

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
                ->where('schedule_number', $activeSchedule->schedule_number)
                ->where('roadmap_id', $roadmap->roadmap_number)
                ->exists();

            if (!$exists) {
                DB::table('schedule_notifications')->insert([
                    'user_id' => $user_id,
                    'schedule_number' => $activeSchedule->schedule_number,
                    'roadmap_number' => $roadmap->roadmap_number,
                    'title' => 'Time to Study: ' . $roadmap->lesson,
                    'message' => 'It\'s time for your scheduled study session on ' . $roadmap->description . '! Stay focused and make progress on your learning journey.',
                    'type' => 'info',
                    'is_read' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if ($roadmaps->isEmpty()) {
            return response()->json(['message' => 'No roadmaps found for the current time'], 404);
        }


        return response()->json(['roadmaps' => $roadmaps], 200);
    }
}
