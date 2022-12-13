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
        Schema::create('establishment', function (Blueprint $table) {
            $table->id('establishment_ID');
            $table->string('establishment_Name')->nullable();
            $table->string('establishment_Description')->nullable();
            $table->string('establishment_NameImage')->nullable();
            $table->dateTime('establishment_CreationDate')->nullable();
            $table->string('establishment_CreationUser')->nullable();
            $table->dateTime('establishment_ModificationDate')->nullable();
            $table->string('establishment_ModificationUser')->nullable();
            $table->integer('establishment_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('establishment');
    }
};
