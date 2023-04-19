<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class BusinessEntity extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'business_entity';
    protected $primaryKey = 'business_entity_id';
    protected $fillable = array('business_entity_id','customer_id', 'supplier_id', 'staff_id', 'created_by' , 'created_in' ,'status_dinamic' ,'status');
    public $timestamps = false;
    public static $rules = array();

}
