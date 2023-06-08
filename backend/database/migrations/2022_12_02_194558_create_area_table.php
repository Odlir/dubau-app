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
        Schema::create('area', function (Blueprint $table) {
            $table->id('area_ID');
            $table->string('area_Name')->nullable();
            $table->string('area_Description')->nullable();
            $table->dateTime('area_CreationDate')->nullable();
            $table->string('area_CreationUser')->nullable();
            $table->dateTime('area_ModificationDate')->nullable();
            $table->string('area_ModificationUser')->nullable();
            $table->integer('area_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('area');
    }
};
