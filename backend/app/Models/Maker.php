<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Maker extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'maker';
    protected $primaryKey = 'maker_ID';
    protected $fillable = array('maker_Name', 'maker_Description','maker_NameImage', 'maker_StatusID','maker_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
