<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class RoadmapController extends Controller
{
    public function getRoadMap($roadmap_id)
    {
        $roadmap = DB::table('roadmaps')
            ->join('topics', 'roadmaps.topic_id', '=', 'topics.id')
            ->select('topics.title', 'roadmaps.lesson', 'roadmaps.description', 'roadmaps.result', 'roadmaps.time', 'roadmaps.date')
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
