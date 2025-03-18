<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Generator extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'schedule_title',
        'free_day',
        'start_time',
        'end_time',
        'duration'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'generator_topics');
    }
}
