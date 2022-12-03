<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Line extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'line';
    protected $primaryKey = 'line_ID';
    protected $fillable = array('line_Name', 'line_Description', 'line_StatusID');
    public $timestamps = false;
    public static $rules = array();
}
