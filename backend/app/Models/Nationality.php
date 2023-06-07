<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Nationality extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'nationality';
    protected $primaryKey = 'nationality_ID';
    protected $fillable = array('nationality_Name', 'cji_usuario_estadoVerificado', 'nationality_StatusID','nationality_CreationDate');
    public $timestamps = false;
    public static $rules = array();

}
