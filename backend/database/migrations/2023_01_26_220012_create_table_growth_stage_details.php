<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableGrowthStageDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('growth_stage_details', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('growth_stage_id')->unsigned();
            $table->string('stage');
            $table->string('starting_day');
            $table->string('ending_day');
            $table->string('gp_container_interval');
            $table->integer('status');
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('growth_stage_details', function (Blueprint $table) {
            $table->foreign('growth_stage_id')->references('id')->on('growth_stage');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('growth_stage_details');
    }
}
