<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->generator->schedule_title,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'roadmap' => $this->roadmaps->map(function ($roadmap) {
                return [
                    'lesson' => $roadmap->lesson,
                    'description' => $roadmap->description,
                    'date' => $roadmap->date,
                    'time' => $roadmap->time,
                    'topic' => $roadmap->topic->title,
                ];
            }),
            'user' => [
                'id' => $this->generator->user->id,
                'full_name' => $this->generator->user->full_name,
                'email' => $this->generator->user->email,
            ],
        ];
    }
}