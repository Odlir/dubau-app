<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class TypeQualification extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'typequalification';
    protected $primaryKey = 'typequalification_ID';
    protected $fillable = array('typequalification_Name', 'typequalification_Description', 'typequalification_StatusID','typequalification_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
