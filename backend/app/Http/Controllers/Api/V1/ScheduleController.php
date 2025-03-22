<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function checkSchedule(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $user_id = $request->id;
        $activeSchedule = DB::table('schedules')
            ->where('status', '!=', 'end')
            ->where('user_id', $user_id)
            ->first();
        if (!$activeSchedule) {
            return response()->json([
                'status' => 'end',
                'success' => false,
            ]);
        }

        $checkType = DB::table('schedules')
            ->where('id', $activeSchedule->id)
            ->value('status');

        if ($checkType) {
            return response()->json([
                'status' => $checkType,
                'success' => true,
            ]);
        }

        return response()->json([
            'error' => 'Unable to determine schedule status',
            'success' => false,
        ], 500);
    }
    public function getHistorySchedule(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $schedules = DB::table('schedules')
            ->join('generators', 'schedules.generator_number', '=', 'generators.generator_number')
            ->join('generator_topics', 'generators.id', '=', 'generator_topics.generator_id')
            ->join('topics', 'generator_topics.topic_id', '=', 'topics.id')
            ->join('roadmaps', 'schedules.id', '=', 'roadmaps.schedule_id')
            ->select(
                'schedules.schedule_number',
                'roadmaps.schedule_id',
                'generators.schedule_title AS title',
                DB::raw("GROUP_CONCAT(DISTINCT topics.title SEPARATOR ' / ') AS topic"),
                DB::raw("CONCAT(generators.start_time, ' - ', generators.end_time) AS freetime"),
                'generators.duration'
            )
            ->where('schedules.user_id', $user_id)
            ->where('schedules.status', 'end')
            ->whereIn('generators.id', function ($query) use ($user_id) {
                $query->select('id')
                    ->from('generators')
                    ->where('user_id', $user_id);
            })
            ->groupBy('schedules.schedule_number', 'roadmaps.schedule_id', 'generators.schedule_title', 'generators.start_time', 'generators.end_time', 'generators.duration')
            ->get();


        return response()->json($schedules);
    }
    public function endSchedule(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $activeSchedule = DB::table('schedules')
            ->where('status', '!=', 'end')
            ->where('user_id', $user_id)
            ->first();

        if (!$activeSchedule) {
            return response()->json(['error' => 'No active schedule found', "success" => false], 404);
        }

        DB::table('schedules')
            ->where('id', $activeSchedule->id)
            ->update(['status' => 'end']);

        $schedule_title = DB::table('generators')
            ->where('id', $activeSchedule->generator_number)
            ->value('schedule_title');
        $exists = DB::table('schedule_notifications')
            ->where('user_id', $user_id)
            ->where('schedule_number', $activeSchedule->schedule_number)
            ->where('roadmap_number', null)
            ->exists();
        if (!$exists) {
            DB::table('schedule_notifications')->insert([
                'user_id' => $user_id,
                'schedule_number' => $activeSchedule->schedule_number,
                'roadmap_number' => null,
                'notification_type' => 'schedule_end',
                'title' => 'Schedule Completed: ' . $schedule_title,
                'message' => 'Your schedule "' . $schedule_title . '" has been successfully completed. Well done!',
                'type' => 'success',
                'is_read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Schedule ended successfully', "success" => true]);
    }
    public function scheduleProcrastinate(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $procrastinate = DB::table('schedules')
            ->where('status', '=', 'active')
            ->where('user_id', $user_id)
            ->first();

        DB::table('schedules')
            ->where('id', $procrastinate->id)
            ->update(['status' => 'procrastinate']);
        return response()->json(['message' => 'Schedule procrastinated successfully', "success" => true]);
    }
}
