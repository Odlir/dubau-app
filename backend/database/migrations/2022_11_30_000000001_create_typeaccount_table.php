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
        Schema::create('typeaccount', function (Blueprint $table) {
            $table->id('typeaccount_ID');
            $table->string('typeaccount_Name')->nullable();
            $table->string('typeaccount_Description')->nullable();
            $table->timestamp('typeaccount_CreationDate')->nullable();
            $table->string('typeaccount_CreationUser')->nullable();
            $table->timestamp('typeaccount_ModificationDate')->nullable();
            $table->string('typeaccount_ModificationUser')->nullable();
            $table->integer('typeaccount_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('typeaccount');
    }
};
