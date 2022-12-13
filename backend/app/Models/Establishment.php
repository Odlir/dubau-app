<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Establishment extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'establishment';
    protected $primaryKey = 'establishment_ID';
    protected $fillable = array('establishment_Name', 'establishment_Description','establishment_NameImage', 'establishment_StatusID','establishment_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
