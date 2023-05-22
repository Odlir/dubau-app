<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Family extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'family';
    protected $primaryKey = 'family_id';
    protected $fillable = array('family_id', 'name', 'internal_code', 'user_code', 'percentage', 'type', 'created_by', 'created_in', 'updated_by', 'updated_in', 'status');
}
