<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Position extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'position';
    protected $primaryKey = 'position_ID';
    protected $fillable = array('position_Name', 'position_Description', 'position_StatusID','position_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
