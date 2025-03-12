<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'gender',
        'email',
        'time_zone',
        'hash_password',
    ];

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function generators()
    {
        return $this->hasMany(Generator::class);
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }
}