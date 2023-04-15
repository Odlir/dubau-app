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
        Schema::create('customer_user', function (Blueprint $table) {
            $table->id('customer_user_id');
            $table->unsignedBigInteger('customer_id');
            //$table->foreign('customer_id')->references('customer_id')->on('customer');
            $table->unsignedBigInteger('user_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->dateTime('registered_in')->nullable();
            $table->string('type')->nullable()->comment('0 deleted, 1 created, 2 updated')->nullable();
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
        Schema::dropIfExists('customer_user');
    }
};
