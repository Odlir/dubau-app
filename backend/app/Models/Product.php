<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use HasFactory, Notifiable;

    public static $rules = array();
    public $timestamps = false;
    protected $table = 'product';
    protected $primaryKey = 'product_id';
    protected $fillable = array('product_id',
        'family_id',
        'product_service_type_id',
        'brand_id',
        'line_id',
        'maker_id',
        'unit_of_measurement_id',
        'name',
        'type',
        'description',
        'comment',
        'model',
        'image',
        'minimun_stock',
        'maximun_stock',
        'internal_code',
        'original_code',
        'user_code',
        'cost',
        'status_dinamic',
        'created_by',
        'created_in',
        'updated_by',
        'updated_in',
        'status');
}
