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
        Schema::create('commercial_section', function (Blueprint $table) {
            $table->id('commercial_section_ID');
            $table->string('commercial_section_Name')->nullable();
            $table->string('commercial_section_Description')->nullable();
            $table->dateTime('commercial_section_CreationDate')->nullable();
            $table->string('commercial_section_CreationUser')->nullable();
            $table->dateTime('commercial_section_ModificationDate')->nullable();
            $table->string('commercial_section_ModificationUser')->nullable();
            $table->integer('commercial_section_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commercial_section');
    }
};
