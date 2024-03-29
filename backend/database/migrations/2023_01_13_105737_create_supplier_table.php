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
        Schema::create('supplier', function (Blueprint $table) {
            $table->id('supplier_id');
            $table->unsignedBigInteger('customer_id');
            //$table->foreign('customer_id')->references('customer_id')->on('customer');
            $table->unsignedBigInteger('type_person_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('company_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('person_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('commercial_section');
            //$table->foreign('user_id')->references('user_id')->on('user');
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
        Schema::dropIfExists('supplier');
    }
};
