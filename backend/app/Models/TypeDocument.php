<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class TypeDocument extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'typedocument';
    protected $primaryKey = 'typedocument_ID';
    protected $fillable = array('typedocument_Name', 'typedocument_Description', 'typedocument_Initial', 'typedocument_StatusID');
    public $timestamps = false;
    public static $rules = array();

}
