<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id('product_id');
            $table->unsignedBigInteger('family_id');
            $table->unsignedBigInteger('product_service_type_id');
            $table->unsignedBigInteger('brand_id');
            $table->unsignedBigInteger('line_id');
            $table->unsignedBigInteger('maker_id');
            $table->unsignedBigInteger('unit_of_measurement_id');
            $table->string('name');
            $table->string('type')->comment('P Producto, S Servicio')->nullable();
            $table->string('description');
            $table->string('comment');
            $table->string('model');
            $table->string('image');
            $table->integer('minimun_stock');
            $table->integer('maximun_stock');
            $table->string('internal_code');
            $table->string('original_code');
            $table->string('user_code');
            $table->integer('cost');
            $table->integer('status_dinamic')->comment('0 inactive, 1 active')->nullable();
            $table->integer('created_by')->nullable();
            $table->dateTime('created_in')->nullable();
            $table->integer('updated_by')->nullable();
            $table->dateTime('updated_in')->nullable();
            $table->integer('status')->comment('0 deleted, 1 actived')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
