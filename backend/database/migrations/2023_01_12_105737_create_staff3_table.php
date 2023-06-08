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
        Schema::create('staff3', function (Blueprint $table) {
            $table->id('staff3_ID');
            $table->unsignedBigInteger('person_ID');
            $table->foreign('person_ID')->references('person_ID')->on('person');
            $table->unsignedBigInteger('position_ID');
            $table->foreign('position_ID')->references('position_ID')->on('position');
            $table->string('staff3_StartDate')->nullable();
            $table->string('staff3_finalDate')->nullable();
            $table->dateTime('staff3_ContractNumber')->nullable();
            $table->dateTime('staff3_CreationDate')->nullable();
            $table->string('staff3_CreationUser')->nullable();
            $table->dateTime('staff3_ModificationDate')->nullable();
            $table->string('staff3_ModificationUser')->nullable();
            $table->integer('staff3_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff3');
    }
};
