<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSystemSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('system_setting', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('intake_timeout');
            $table->string('draining_timeout');
            $table->string('serial_port_data_timeout');
            $table->string('water_quality_checking_start_time_delay');
            $table->string('tds_minimum_threshold');
            $table->string('sample_solution_mixing_time');
            $table->string('minimum_dosing_motor_on_time_a');
            $table->string('minimum_dosing_motor_on_time_b');
            $table->string('minimum_dosing_motor_on_time_alkali');
            $table->string('minimum_dosing_motor_on_time_acid');
            $table->string('minimum_dosing_motor_on_time_gp');
            $table->string('minimum_dosing_quantity');
            $table->string('mixer_capacity');
            $table->string('tds_dosing_enable');
            $table->string('ph_dosing_enable');
            $table->string('gp_dosing_enable');
            $table->integer('response_status');
            $table->integer('status');
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->bigInteger('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('system_setting');
    }
}
