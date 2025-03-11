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
        $schedule_id = DB::table('schedules')->select('id')->where('status', 'active')->value('id');
        $roadmap = DB::table('roadmaps')
            ->join('topics', 'roadmaps.topic_id', '=', 'topics.id')
            ->select('roadmaps.id', 'topics.title', 'roadmaps.lesson', 'roadmaps.description', 'roadmaps.result', 'roadmaps.start_time', 'roadmaps.end_time', 'roadmaps.date')
            ->where('schedule_id', $schedule_id)
            ->get();

        $now = Carbon::now();
        //get only roadmap that has date and end time greater than now
        $filteredRoadmap = $roadmap->filter(function ($item) use ($now) {
            $endDateTime = Carbon::createFromFormat('Y-m-d H:i:s', $item->date . ' ' . $item->end_time);
            return $endDateTime->greaterThan($now);
        });

        return response()->json($filteredRoadmap->values());
    }
    public function getRoadMapDetail($roadmap_id)
    {
        $roadmap = DB::table('roadmaps')
            ->join('topics', 'roadmaps.topic_id', '=', 'topics.id')
            ->select('topics.title', 'roadmaps.lesson', 'roadmaps.description', 'roadmaps.result', 'roadmaps.start_time', 'roadmaps.end_time', 'roadmaps.date')
            ->where('roadmaps.id', $roadmap_id)
            ->get();

        if ($roadmap->isEmpty()) {
            return response()->json(['error' => 'Roadmap not found'], 404);
        }
        return response()->json($roadmap);
    }
    public function updateRoadmapScore(Request $request, $roadmap_id)
    {
        $request->validate([
            'result' => 'required|integer',
        ]);
        $result = $request->input('result');
        $roadmap = DB::table('roadmaps')->where('id', $roadmap_id)->get();
        if ($roadmap->isEmpty()) {
            return response()->json(['error' => 'Roadmap not found'], 404);
        }
        DB::table('roadmaps')->where('id', $roadmap_id)->update([
            'result' => $result,
        ]);
        return response()->json(['message' => 'result updated successfully']);
    }
}
