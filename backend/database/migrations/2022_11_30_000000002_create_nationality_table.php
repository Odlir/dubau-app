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
        Schema::create('nationality', function (Blueprint $table) {
            $table->id('nationality_ID');
            $table->string('nationality_Name')->nullable();
            $table->string('nationality_Description')->nullable();
            $table->dateTime('nationality_CreationDate')->nullable();
            $table->string('nationality_CreationUser')->nullable();
            $table->dateTime('nationality_ModificationDate')->nullable();
            $table->string('nationality_ModificationUser')->nullable();
            $table->integer('nationality_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nationality');
    }
};
