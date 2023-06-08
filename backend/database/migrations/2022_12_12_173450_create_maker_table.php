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
        Schema::create('maker', function (Blueprint $table) {
            $table->id('maker_ID');
            $table->string('maker_Name')->nullable();
            $table->string('maker_Description')->nullable();
            $table->string('maker_NameImage')->nullable();
            $table->dateTime('maker_CreationDate')->nullable();
            $table->string('maker_CreationUser')->nullable();
            $table->dateTime('maker_ModificationDate')->nullable();
            $table->string('maker_ModificationUser')->nullable();
            $table->integer('maker_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('maker');
    }
};
