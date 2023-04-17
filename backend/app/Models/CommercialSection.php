<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class CommercialSection extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'commercial_section';
    protected $primaryKey = 'commercial_section_ID';
    protected $fillable = array('commercial_section_Name', 'commercial_section_Description', 'commercial_section_StatusID' ,'commercial_section_CreationDate');
    public $timestamps = false;
    public static $rules = array();
}
