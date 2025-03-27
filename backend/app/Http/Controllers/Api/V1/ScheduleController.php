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
        $procrastinateSchedule = DB::table('schedules')
            ->where('status', '=', 'active')
            ->where('user_id', $user_id)
            ->first();
        if (!$procrastinateSchedule) {
            return response()->json(['error' => 'No active schedule found', "success" => false], 404);
        }
        $procrastinate = DB::table('schedules')
            ->where('id', $procrastinateSchedule->id)
            ->update(['status' => 'procrastinate']);

        if (!$procrastinate) {
            return response()->json(['error' => 'No active schedule found', "success" => false], 404);
        }

        $generator = DB::table('generators')
            ->where('generator_number', $procrastinateSchedule->generator_number)
            ->where('user_id', $user_id)
            ->first();

        // $duration = null;
        // if (preg_match('/\d+/', $generator->duration, $matches)) {
        //     $duration = (int) $matches[0];
        // }
        // $freeDays = explode(', ', $generator->free_day);
        $sessionCount = DB::table('roadmaps')
            ->where('schedule_id', $procrastinateSchedule->id)
            ->count();

        $sessionLimit = intdiv($sessionCount * 30, 100);
        $checkAlreadyProcrastinate = DB::table('schedule_procrastinate')
            ->where('schedule_number', $procrastinateSchedule->schedule_number)
            ->where('is_active', false)
            ->exists();
        if ($checkAlreadyProcrastinate) {
            $insertProcrastinate = DB::table('schedule_procrastinate')
                ->where('schedule_number', $procrastinateSchedule->schedule_number)
                ->where('user_id', $user_id)
                ->update([
                    'start_date' => now(),
                    'is_active' => true,
                    'updated_at' => now()
                ]);
            if (!$insertProcrastinate) {
                return response()->json(['error' => 'Failed to procrastinate schedule', "success" => false], 500);
            }
            return response()->json(['message' => 'Schedule procrastinated successfully', "success" => true]);
        } else {

            $insertProcrastinate = DB::table('schedule_procrastinate')->insert([
                'schedule_number' => $procrastinateSchedule->schedule_number,
                'user_id' => $user_id,
                'session_limit' => $sessionLimit,
                'is_active' => true,
                'start_date' => now(),
                'end_date' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            if (!$insertProcrastinate) {
                return response()->json(['error' => 'Failed to procrastinate schedule', "success" => false], 500);
            }

            return response()->json(['message' => 'Schedule procrastinated successfully', "success" => true]);
        }
    }
    public function continueCourse(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $procrastinate = DB::table('schedules')
            ->where('status', '=', 'procrastinate')
            ->where('user_id', $user_id)
            ->first();

        DB::table('schedules')
            ->where('id', $procrastinate->id)
            ->update(['status' => 'active']);
        if (!$procrastinate) {
            return response()->json(['error' => 'No active schedule found', "success" => false], 404);
        }
        DB::table('schedule_procrastinate')
            ->where('schedule_number', $procrastinate->schedule_number)
            ->update(['is_active' => false, 'end_date' => now()]);
        $sessionCount = DB::table('roadmaps')
            ->join('schedules', 'roadmaps.schedule_id', '=', 'schedules.id')
            ->join('schedule_procrastinate', 'schedules.schedule_number', '=', 'schedule_procrastinate.schedule_number')
            ->where('schedule_procrastinate.user_id', $user_id)
            ->where('schedule_procrastinate.schedule_number', $procrastinate->schedule_number)
            ->whereRaw("CONCAT(roadmaps.date, ' ', roadmaps.start_time) BETWEEN schedule_procrastinate.start_date AND NOW()")
            ->count();
        $schedule_procrastinate = DB::table('schedule_procrastinate')
            ->where('schedule_number', $procrastinate->schedule_number)
            ->where('user_id', $user_id)
            ->first();
        $newSessionCount = $sessionCount + $schedule_procrastinate->session_count;
        if ($sessionCount <= $schedule_procrastinate->session_limit) {
            DB::table('schedule_procrastinate')
                ->where('schedule_number', $procrastinate->schedule_number)
                ->update(['session_count' => $newSessionCount]);
            return response()->json(['message' => 'Session Count is small than 0', "success" => false]);
        } else if ($sessionCount > $schedule_procrastinate->session_limit) {
            DB::table('schedule_procrastinate')
                ->where('schedule_number', $procrastinate->schedule_number)
                ->update(['session_count' => $newSessionCount]);
            DB::table('schedules')
                ->where('id', $procrastinate->id)
                ->update(['status' => 'end']);
            return response()->json(['message' => 'You have reach the limit of procrastinate', "success" => false]);
        }
        return response()->json(['message' => 'Schedule continued successfully', "success" => true]);
    }

    public function checkSessionLimit(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $procrastinateSchedule = DB::table('schedules')
            ->where('status', '=', 'active')
            ->where('user_id', $user_id)
            ->first();
        $sessionCount = DB::table('roadmaps')
            ->where('schedule_id', $procrastinateSchedule->id)
            ->count();

        $sessionLimit = intdiv($sessionCount * 30, num2: 100);
        if ($sessionCount <= 0) {
            return response()->json(['message' => 'Session limit is small than 0', "success" => false]);
        }
        return response()->json(['session_limit' => $sessionLimit, "success" => true]);
    }
    public function checkSessionRemaining(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);
        $user_id = $request->id;
        $procrastinateSchedule = DB::table('schedules')
            ->where('status', '=', 'procrastinate')
            ->where('user_id', $user_id)
            ->first();
        if (!$procrastinateSchedule) {
            return response()->json(['message' => 'Schedule Not Found', "success" => false]);
        }
        $sessionCount = DB::table('roadmaps')
            ->where('schedule_id', $procrastinateSchedule->id)
            ->count();
        $procrastinate = DB::table('schedule_procrastinate')
            ->where('schedule_number', '=', $procrastinateSchedule->schedule_number)
            ->where('user_id', $user_id)
            ->first();
        $sessionLimit = intdiv($sessionCount * 30, num2: 100);
        if (!$procrastinateSchedule) {
            return response()->json(['message' => 'Schedule Not Found', "success" => false]);
        }
        $sessionRemaining​ = $sessionLimit - $procrastinate->session_count;
        return response()->json(['session_remaining' => $sessionRemaining​, "success" => true]);
    }
}
