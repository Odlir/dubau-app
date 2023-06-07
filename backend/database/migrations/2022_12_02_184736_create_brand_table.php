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
        Schema::create('brand', function (Blueprint $table) {
            $table->id('brand_ID');
            $table->string('brand_Name')->nullable();
            $table->string('brand_Description')->nullable();
            $table->string('brand_NameImage')->nullable();
            $table->dateTime('brand_CreationDate')->nullable();
            $table->string('brand_CreationUser')->nullable();
            $table->dateTime('brand_ModificationDate')->nullable();
            $table->string('brand_ModificationUser')->nullable();
            $table->integer('brand_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('brand');
    }
};
