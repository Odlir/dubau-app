<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class Ubigeous extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'ubigeous';
    protected $primaryKey = 'ubigeous_ID';
    protected $fillable = array('ubigeous_Name', 'ubigeous_Description', 'ubigeous_StatusID','ubigeous_CreationDate');
    public $timestamps = false;
    public static $rules = array();

}
