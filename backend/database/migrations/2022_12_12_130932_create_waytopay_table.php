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
        Schema::create('waytopay', function (Blueprint $table) {
            $table->id('waytopay_ID');
            $table->string('waytopay_Name')->nullable();
            $table->string('waytopay_Description')->nullable();
            $table->string('waytopay_NameImage')->nullable();
            $table->dateTime('waytopay_CreationDate')->nullable();
            $table->string('waytopay_CreationUser')->nullable();
            $table->dateTime('waytopay_ModificationDate')->nullable();
            $table->string('waytopay_ModificationUser')->nullable();
            $table->integer('waytopay_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('waytopay');
    }
};
