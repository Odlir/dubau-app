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
        Schema::create('role', function (Blueprint $table) {
            $table->id('role_ID');
            $table->string('role_Name')->nullable();
            $table->string('role_Description')->nullable();
            $table->dateTime('role_CreationDate')->nullable();
            $table->string('role_CreationUser')->nullable();
            $table->dateTime('role_ModificationDate')->nullable();
            $table->string('role_ModificationUser')->nullable();
            $table->integer('role_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('role');
    }
};
