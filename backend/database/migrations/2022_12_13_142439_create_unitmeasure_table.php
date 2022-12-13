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
        Schema::create('unitmeasure', function (Blueprint $table) {
            $table->id('unitmeasure_ID');
            $table->string('unitmeasure_Name')->nullable();
            $table->string('unitmeasure_Description')->nullable();
            $table->dateTime('unitmeasure_CreationDate')->nullable();
            $table->string('unitmeasure_CreationUser')->nullable();
            $table->dateTime('unitmeasure_ModificationDate')->nullable();
            $table->string('unitmeasure_ModificationUser')->nullable();
            $table->integer('unitmeasure_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unitmeasure');
    }
};
