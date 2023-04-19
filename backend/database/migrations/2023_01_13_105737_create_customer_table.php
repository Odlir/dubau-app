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
        Schema::create('customer', function (Blueprint $table) {
            $table->id('customer_id');
            $table->unsignedBigInteger('type_person_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('company_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('person_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('category_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('waytopay_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('credit_line_id');
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
        Schema::dropIfExists('customer');
    }
};
