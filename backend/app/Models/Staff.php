<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Staff extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'staff';
    protected $primaryKey = 'staff_ID';
    protected $fillable = array('person_ID', 'position_ID','staff_StartDate','staff_finalDate', 'staff_ContractNumber','staff_StatusID','staff_CreationDate','staff_NameImage');
    public $timestamps = false;
    public static $rules = array();
}
