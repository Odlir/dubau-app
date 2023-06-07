<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Customer extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'customer';
    protected $primaryKey = 'customer_id';
    protected $fillable = array('customer_id', 'type_person_id','company_id','person_id', 'category_id','waytopay_id','credit_line_id', 'created_by','created_in','status');
    public $timestamps = false;
    public static $rules = array();
}
