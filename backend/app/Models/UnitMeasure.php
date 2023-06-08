<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class UnitMeasure extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'unitmeasure';
    protected $primaryKey = 'unitmeasure_ID';
    protected $fillable = array('unitmeasure_Name', 'unitmeasure_Description', 'unitmeasure_StatusID','unitmeasure_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
