<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class User2 extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'cji_usuario';
    protected $primaryKey = 'USUA_Codigo';
    protected $fillable = array('USUA_usuario', 'USUA_Password', 'cji_usuario_estadoVerificado', 'cji_usuario_estadoID');
    public $timestamps = false;
    public static $rules = array();

    protected $hidden = [
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
