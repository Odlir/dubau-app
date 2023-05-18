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
    protected $table = 'inventory_detail';
    protected $primaryKey = 'inventory_detail_id';
    protected $fillable = array('inventory_detail_id', 'inventory_id', 'product_id', 'product_id', 'amount', 'cost', 'status_dinamic', 'updated_by', 'updated_in', 'created_by', 'created_in', 'status');
}
