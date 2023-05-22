<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class ProductServiceType extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'product_service_type';
    protected $primaryKey = 'product_service_type_id';
    protected $fillable = array('product_service_type_id', 'name', 'type', 'created_by', 'created_in', 'status');
}
