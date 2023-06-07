<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('business_entity', function (Blueprint $table) {
            $table->id('business_entity_id');
            $table->unsignedBigInteger('customer_id');
            //$table->foreign('customer_id')->references('customer_id')->on('customer');
            $table->unsignedBigInteger('supplier_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('staff_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->string('created_by')->nullable();
            $table->dateTime('created_in')->nullable();
            $table->integer('status_dinamic')->comment('0 inactive, 1 active')->nullable();
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
        Schema::dropIfExists('business_entity');
    }
};
