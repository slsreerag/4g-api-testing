<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableMacroDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('macro_details', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->bigInteger('plant_id')->unsigned();
            $table->string('macro_id');
            $table->string('installation_date');
            $table->string('transplanting_date');
            $table->string('tank_capacity');
            $table->string('number_of_mini_units');
            $table->string('number_of_pots');
            $table->string('dosing_interval');
            $table->string('response_status');
            $table->integer('status');
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('macro_details', function (Blueprint $table) {
            $table->foreign('plant_id')->references('id')->on('plant_details');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('macro_details');
    }
}
