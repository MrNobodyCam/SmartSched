<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'generator_id',
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
