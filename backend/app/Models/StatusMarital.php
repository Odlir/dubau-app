<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class StatusMarital extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'statusmarital';
    protected $primaryKey = 'statusmarital_ID';
    protected $fillable = array('statusmarital_Name', 'statusmarital_Description', 'statusmarital_StatusID','statusmarital_CreationDate');
    public $timestamps = false;
    public static $rules = array();

}
