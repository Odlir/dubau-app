<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Category extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'category';
    protected $primaryKey = 'category_ID';
    protected $fillable = array('category_Name', 'category_Description', 'category_StatusID' ,'category_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
