<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProfitByFamily extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'profit_by_family';
    protected $primaryKey = 'profit_by_family_id';
    protected $fillable = array('profit_by_family_id', 'family_id', 'category_id', 'coin_id', 'percentage', 'created_by', 'created_in', 'updated_by', 'updated_in', 'status');
}
