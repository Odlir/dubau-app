<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Supplier extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'supplier';
    protected $primaryKey = 'supplier_id';
    protected $fillable = array('supplier_id', 'type_person_id','company_id','person_id', 'commercial_section','created_by','created_in','status');
    public $timestamps = false;
    public static $rules = array();
}
