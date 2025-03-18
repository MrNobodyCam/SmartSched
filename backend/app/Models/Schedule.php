<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_number',
        'user_id',
        'generator_id',
        'generator_number',
        'title',
        'start_date',
        'end_date',
    ];

    public function generator()
    {
        return $this->belongsTo(Generator::class);
    }

    public function roadmaps()
    {
        return $this->hasMany(Roadmap::class);
    }
}
