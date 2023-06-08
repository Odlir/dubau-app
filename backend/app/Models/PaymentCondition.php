<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class PaymentCondition extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'payment_condition';
    protected $primaryKey = 'payment_condition_ID';
    protected $fillable = array('payment_condition_Name', 'payment_condition_Description', 'payment_condition_StatusID' ,'payment_condition_CreationDate','payment_condition_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
