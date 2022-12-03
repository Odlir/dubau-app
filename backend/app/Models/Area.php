<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Area extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'area';
    protected $primaryKey = 'area_ID';
    protected $fillable = array('area_Name', 'area_Description', 'area_StatusID');
    public $timestamps = false;
    public static $rules = array();
}
