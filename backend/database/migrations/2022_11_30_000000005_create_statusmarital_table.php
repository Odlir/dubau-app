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
        Schema::create('statusmarital', function (Blueprint $table) {
            $table->id('statusmarital_ID');
            $table->string('statusmarital_Name')->nullable();
            $table->string('statusmarital_Description')->nullable();
            $table->timestamp('statusmarital_CreationDate')->nullable();
            $table->string('statusmarital_CreationUser')->nullable();
            $table->timestamp('statusmarital_ModificationDate')->nullable();
            $table->string('statusmarital_ModificationUser')->nullable();
            $table->integer('statusmarital_StatusID')->comment('0 removed, 1 activated')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('statusmarital');
    }
};
