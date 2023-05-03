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
        Schema::create('product_service_type', function (Blueprint $table) {
            $table->id('product_service_type_id');
            $table->string('name');
            $table->string('type')->comment('P Producto, S Servicio')->nullable();
            $table->integer('created_by')->nullable();
            $table->dateTime('created_in')->nullable();
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
        Schema::dropIfExists('product_service_type');
    }
};
