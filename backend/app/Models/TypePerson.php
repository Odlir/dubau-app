<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TypePerson extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'type_person';
    protected $primaryKey = 'type_person_id';
    protected $fillable = array('type_person_id', 'type_person_Name');

}
