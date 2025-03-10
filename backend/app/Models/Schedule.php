<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'roadmap_id',
    ];

    /**
     * Get the roadmap that owns the schedule.
     */
    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }
}
