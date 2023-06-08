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
        Schema::create('inventory_detail', function (Blueprint $table) {
            $table->id('inventory_detail_id');
            $table->unsignedBigInteger('inventory_id');
            $table->unsignedBigInteger('product_id');
            $table->string('amount');
            $table->double('cost');
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
        Schema::dropIfExists('inventory_detail');
    }
};
