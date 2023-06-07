<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class WayToPay extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'waytopay';
    protected $primaryKey = 'waytopay_ID';
    protected $fillable = array('waytopay_Name', 'waytopay_Description', 'waytopay_StatusID','waytopay_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
