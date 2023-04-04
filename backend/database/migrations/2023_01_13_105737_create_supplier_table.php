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
            $table->unsignedBigInteger('company_id');
            //$table->foreign('customer_id')->references('customer_id')->on('customer');
            $table->unsignedBigInteger('person_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('type_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('way_pay_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->unsignedBigInteger('ubigeous_id');
            //$table->foreign('user_id')->references('user_id')->on('user');
            $table->string('qualification')->nullable()->comment('0 excellent, 1 well,2 regular, 2 bad, 3 negative')->nullable();
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
        Schema::dropIfExists('customer_user');
    }
};
