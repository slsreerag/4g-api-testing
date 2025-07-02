<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTablePlantStage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plants_stage', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('plant_id')->unsigned();
            $table->string('stage');
            $table->string('standard_tds');
            $table->string('tds_range');
            $table->string('standard_ph');
            $table->string('ph_range');
            $table->string('standard_quality_of_general_solution');
            $table->integer('status');
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('plants_stage', function (Blueprint $table) {
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
        Schema::dropIfExists('plants_stage');
    }
}
