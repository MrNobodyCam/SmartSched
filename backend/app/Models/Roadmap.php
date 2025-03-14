<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roadmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_id',
        'topic_id',
        'lesson',
        'description',
        'start_time',
        'end_time',
        'date',
        'result'
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
