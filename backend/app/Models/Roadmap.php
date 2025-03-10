<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roadmap extends Model
{
    use HasFactory;

    protected $fillable = [
        'lesson',
        'date',
        'time',
        'topic_id',
    ];

    /**
     * Get the topic that owns the roadmap.
     */
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
