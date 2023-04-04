<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Staff3 extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'staff3';
    protected $primaryKey = 'staff3_ID';
    protected $fillable = array('person_ID', 'position_ID','staff3_StartDate','staff3_finalDate', 'staff3_ContractNumber','staff3_StatusID','staff3_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
