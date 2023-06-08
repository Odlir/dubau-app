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
        Schema::create('position', function (Blueprint $table) {
            $table->id('position_ID');
            $table->string('position_Name')->nullable();
            $table->string('position_Description')->nullable();
            $table->dateTime('position_CreationDate')->nullable();
            $table->string('position_CreationUser')->nullable();
            $table->dateTime('position_ModificationDate')->nullable();
            $table->string('position_ModificationUser')->nullable();
            $table->integer('position_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('position');
    }
};
