<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleNotification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'schedule_number',
        'roadmap_number',
        'notification_type',
        'type',
        'title',
        'message',
        'is_read',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }
}
