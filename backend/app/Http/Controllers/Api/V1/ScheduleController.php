<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function getHistorySchedule()
    {
        $user_id = 1;
        $schedules = DB::table('schedules')
            ->join('generators', 'schedules.generator_number', '=', 'generators.generator_number')
            ->join('generator_topics', 'generators.id', '=', 'generator_topics.generator_id')
            ->join('topics', 'generator_topics.topic_id', '=', 'topics.id')
            ->select(
                'schedules.id',
                'generators.schedule_title as title',
                DB::raw("GROUP_CONCAT(topics.title SEPARATOR ' / ') AS topic"),
                DB::raw("CONCAT(generators.start_time, ' - ', generators.end_time) AS freetime"),
                'generators.duration'
            )
            ->where('schedules.user_id', $user_id)  // Correct reference to $user_id
            ->where('schedules.status', 'end')
            ->groupBy('schedules.id', 'generators.schedule_title', 'generators.start_time', 'generators.end_time', 'generators.duration')
            ->get();


        return response()->json($schedules);
    }
    public function endSchedule()
    {
        // $schedule_id = DB::table('schedules')->select('id')->where('status', 'active')->value('id');
        DB::table('schedules')->where('status', "active")->update([
            'status' => 'end',
        ]);
        return response()->json(['message' => 'Schedule end successfully']);
    }
}
