<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RoadmapController extends Controller
{
    public function getRoadMap()
    {
        $user_id = 1;
        $schedule_id = DB::table('schedules')->select('id')->where('status', 'active')->where('user_id', $user_id)->value('id');
        $roadmap = DB::table('roadmaps')
            ->join('topics', 'roadmaps.topic_id', '=', 'topics.id')
            ->join('schedules', 'roadmaps.schedule_id', '=', 'schedules.id')
            ->join('users', 'schedules.user_id', '=', 'users.id')
            ->select('roadmaps.roadmap_number', 'roadmaps.schedule_id', 'topics.title', 'roadmaps.lesson', 'roadmaps.description', 'roadmaps.result', 'roadmaps.start_time', 'roadmaps.end_time', 'roadmaps.date')
            ->where('schedules.id', $schedule_id)
            ->get();

        // $now = Carbon::now();
        // //get only roadmap that has date and end time greater than now
        // $filteredRoadmap = $roadmap->filter(function ($item) use ($now) {
        //     $endDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $item->date . ' ' . $item->end_time);
        //     return $endDateTime->greaterThan($now);
        // });
        $sortedRoadmap = $roadmap->sortBy(function ($item) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $item->date . ' ' . $item->end_time);
        });
        return response()->json($sortedRoadmap->values());
    }
    public function getHistoryRoadMap(Request $request)
    {
        $user_id = 1;
        $request->validate(
            ['schedule_number' => 'required|integer'],
        );
        $schedule_number = $request->input('schedule_number');
        $roadmap = DB::table('schedules')
            ->join('roadmaps', 'schedules.id', '=', 'roadmaps.schedule_id')
            ->join('topics', 'roadmaps.topic_id', '=', second: 'topics.id')
            ->select('roadmaps.roadmap_number', 'roadmaps.schedule_id', 'topics.title', 'roadmaps.lesson', 'roadmaps.description', 'roadmaps.result', 'roadmaps.start_time', 'roadmaps.end_time', 'roadmaps.date')
            ->where('schedule_id', operator: $schedule_number)
            ->where('schedules.user_id', operator: $user_id)
            ->where('schedules.status', operator: 'end')
            ->get();
        $sortedRoadmap = $roadmap->sortBy(function ($item) {
            return Carbon::createFromFormat('Y-m-d H:i:s', $item->date . ' ' . $item->end_time);
        });
        if ($roadmap->isEmpty()) {
            return response()->json(['error' => 'Roadmap not found'], 404);
        }
        return response()->json($sortedRoadmap->values());
    }

    public function getRoadMapDetail(Request $request)
    {
        $request->validate([
            'roadmap_number' => 'required|integer',
            'schedule_id' => 'required|integer',
        ]);
        $roadmap_number = $request->input('roadmap_number');
        $schedule_id = $request->input('schedule_id');
        $roadmap = DB::table('roadmaps')
            ->join('topics', 'roadmaps.topic_id', '=', 'topics.id')
            ->select('topics.title', 'roadmaps.lesson', 'roadmaps.description', 'roadmaps.result', 'roadmaps.start_time', 'roadmaps.end_time', 'roadmaps.date')
            ->where('roadmaps.roadmap_number', $roadmap_number)
            ->where('roadmaps.schedule_id', $schedule_id)
            ->get();

        if ($roadmap->isEmpty()) {
            return response()->json(['error' => 'Roadmap not found'], 404);
        }
        return response()->json($roadmap);
    }
    public function updateRoadmapScore(Request $request)
    {
        $request->validate([
            'result' => 'required|integer',
            'roadmap_number' => 'required|integer',
            'schedule_id' => 'required|integer',
        ]);
        $roadmap_number = $request->input('roadmap_number');
        $schedule_id = $request->input('schedule_id');
        $result = $request->input('result');
        $roadmap = DB::table('roadmaps')->where('roadmap_number', $roadmap_number)->where('schedule_id', $schedule_id)->get();
        if ($roadmap->isEmpty()) {
            return response()->json(['error' => 'Roadmap not found'], 404);
        }
        DB::table('roadmaps')->where('roadmap_number', $roadmap_number)->where('schedule_id', $schedule_id)->update([
            'result' => $result,
        ]);
        return response()->json(['message' => 'result updated successfully']);
    }
}
