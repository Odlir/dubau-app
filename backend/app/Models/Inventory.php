<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Inventory extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'inventory';
    protected $primaryKey = 'inventory_id';
    protected $fillable = array('inventory_id', 'name', 'start_date', 'final_date', 'created_in', 'status');
}
