<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Brand extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'brand';
    protected $primaryKey = 'brand_ID';
    protected $fillable = array('brand_Name', 'brand_Description', 'brand_StatusID','brand_CreationDate','brand_NameImage');
    public $timestamps = false;
    public static $rules = array();
}
