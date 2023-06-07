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
        Schema::create('category', function (Blueprint $table) {
            $table->id('category_ID');
            $table->string('category_Name')->nullable();
            $table->string('category_Description')->nullable();
            $table->dateTime('category_CreationDate')->nullable();
            $table->string('category_CreationUser')->nullable();
            $table->dateTime('category_ModificationDate')->nullable();
            $table->string('category_ModificationUser')->nullable();
            $table->integer('category_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('category');
    }
};
