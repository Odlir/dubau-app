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
        Schema::create('line', function (Blueprint $table) {
            $table->id('line_ID');
            $table->string('line_Name')->nullable();
            $table->string('line_Description')->nullable();
            $table->dateTime('line_CreationDate')->nullable();
            $table->string('line_CreationUser')->nullable();
            $table->dateTime('line_ModificationDate')->nullable();
            $table->string('line_ModificationUser')->nullable();
            $table->integer('line_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('line');
    }
};
