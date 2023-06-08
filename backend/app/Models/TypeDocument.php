<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class TypeDocument extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'typedocument';
    protected $primaryKey = 'typedocument_ID';
    protected $fillable = array('typedocument_ID', 'typedocument_Name', 'typedocument_Description', 'typedocument_Initial', 'typedocument_StatusID', 'typedocument_CreationDate');

}
