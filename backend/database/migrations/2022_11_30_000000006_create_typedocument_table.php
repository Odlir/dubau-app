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
        Schema::create('typedocument', function (Blueprint $table) {
            $table->id('typedocument_ID');
            $table->string('typedocument_Name')->nullable();
            $table->string('typedocument_Description')->nullable();
            $table->string('typedocument_Initial')->nullable();
            $table->dateTime('typedocument_CreationDate')->nullable();
            $table->string('typedocument_CreationUser')->nullable();
            $table->dateTime('typedocument_ModificationDate')->nullable();
            $table->string('typedocument_ModificationUser')->nullable();
            $table->integer('typedocument_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('typedocument');
    }
};
