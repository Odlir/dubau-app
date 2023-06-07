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
        Schema::create('type_person', function (Blueprint $table) {
            $table->id('type_person_ID');
            $table->string('type_person_Name')->nullable();
            $table->string('type_person_Description')->nullable();
            $table->dateTime('type_person_CreationDate')->nullable();
            $table->string('type_person_CreationUser')->nullable();
            $table->dateTime('type_person_ModificationDate')->nullable();
            $table->string('type_person_ModificationUser')->nullable();
            $table->integer('type_person_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('type_person');
    }
};
