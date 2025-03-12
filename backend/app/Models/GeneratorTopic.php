<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneratorTopic extends Model
{
    use HasFactory;

    protected $fillable = [
        'generator_id',
        'topic_id',
    ];

    public function generator()
    {
        return $this->belongsTo(Generator::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}