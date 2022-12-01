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
        Schema::create('user', function (Blueprint $table) {
            $table->id('user_ID');
            $table->unsignedBigInteger('person_ID');
            $table->foreign('person_ID')->references('person_ID')->on('person');
            $table->unsignedBigInteger('role_ID');
            $table->foreign('role_ID')->references('role_ID')->on('role');
            $table->string('user_Name')->unique();
            $table->string('user_Password');
            $table->dateTime('user_CreationDate')->nullable();
            $table->string('user_CreationUser')->nullable();
            $table->dateTime('user_ModificationDate')->nullable();
            $table->string('user_ModificationUser')->nullable();
            $table->integer('user_ApprovedStatus')->comment('0 deprecated, 1 on hold, 2 activated');
            $table->integer('user_StatusID')->comment('0 removed, 1 activated');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user');
    }
};
