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
        Schema::create('payment_condition', function (Blueprint $table) {
            $table->id('payment_condition_ID');
            $table->string('payment_condition_Name')->nullable();
            $table->string('payment_condition_Description')->nullable();
            $table->dateTime('payment_condition_CreationDate')->nullable();
            $table->string('payment_condition_CreationUser')->nullable();
            $table->dateTime('payment_condition_ModificationDate')->nullable();
            $table->string('payment_condition_ModificationUser')->nullable();
            $table->integer('payment_condition_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payment_condition');
    }
};
