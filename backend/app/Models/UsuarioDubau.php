<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioDubau extends Model
{
    use HasFactory;
    protected $table = 'cji_usuario';
    protected $fillable = array('USUA_usuario','email', 'USUA_Password');
    public $timestamps = false;
    public static $rules = array();


}
