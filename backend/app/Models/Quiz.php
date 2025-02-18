<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'roadmap_id',
        'question',
        'correct_answer',
    ];

    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}