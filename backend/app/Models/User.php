<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens , HasFactory, Notifiable;

    protected $fillable = [
        'full_name',
        'gender',
        'email',
        'time_zone',
        'hash_password',
        'is_verified',
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