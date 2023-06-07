<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Staff2 extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'staff2';
    protected $primaryKey = 'staff2_ID';
    protected $fillable = array('person_ID', 'position_ID','staff2_StartDate','staff2_finalDate', 'staff2_ContractNumber','staff2_StatusID','staff2_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
