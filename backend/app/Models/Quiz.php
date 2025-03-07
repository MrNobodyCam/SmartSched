<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'roadmap_id',
        'quiz_id',
    ];

    /**
     * Get the roadmap that owns the quiz.
     */
    public function roadmap()
    {
        return $this->belongsTo(Roadmap::class);
    }

    /**
     * Get the answer associated with the quiz.
     */
    public function answer()
    {
        return $this->belongsTo(Answer::class, 'quiz_id');
    }
}
