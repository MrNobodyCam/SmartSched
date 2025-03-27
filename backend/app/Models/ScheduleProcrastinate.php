<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleProcrastinate extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_number',
        'user_id',
        'session_limit',
        'session_count',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class, 'schedule_number', 'schedule_number');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
