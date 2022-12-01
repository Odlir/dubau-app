<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Role extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'role';
    protected $primaryKey = 'role_ID';
    protected $fillable = array('role_Name', 'role_Name', 'role_StatusID');
    public $timestamps = false;
    public static $rules = array();
}
