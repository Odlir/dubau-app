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
        Schema::create('staff2', function (Blueprint $table) {
            $table->id('staff2_ID');
            $table->unsignedBigInteger('person_ID');
            $table->foreign('person_ID')->references('person_ID')->on('person');
            $table->unsignedBigInteger('position_ID');
            $table->foreign('position_ID')->references('position_ID')->on('position');
            $table->string('staff2_StartDate')->nullable();
            $table->string('staff2_finalDate')->nullable();
            $table->dateTime('staff2_ContractNumber')->nullable();
            $table->dateTime('staff2_CreationDate')->nullable();
            $table->string('staff2_CreationUser')->nullable();
            $table->dateTime('staff2_ModificationDate')->nullable();
            $table->string('staff2_ModificationUser')->nullable();
            $table->integer('staff2_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('staff2');
    }
};
