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
        Schema::create('typequalification', function (Blueprint $table) {
            $table->id('typequalification_ID');
            $table->string('typequalification_Name')->nullable();
            $table->string('typequalification_Description')->nullable();
            $table->dateTime('typequalification_CreationDate')->nullable();
            $table->string('typequalification_CreationUser')->nullable();
            $table->dateTime('typequalification_ModificationDate')->nullable();
            $table->string('typequalification_ModificationUser')->nullable();
            $table->integer('typequalification_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('typequalification');
    }
};
