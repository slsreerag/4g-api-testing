<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTable32ioPumpSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('32io_pump_setting', function (Blueprint $table) {
            $table->renameColumn('pump_name','P1');
            $table->renameColumn('pump_id','P2');
            $table->renameColumn('switchonoff','P3');
            $table->string('P4')->nullable();
            $table->string('P5')->nullable();
            $table->string('P6')->nullable();
            $table->string('P7')->nullable();
            $table->string('P8')->nullable();
            $table->string('P9')->nullable();
            $table->string('P10')->nullable();
            $table->string('P11')->nullable();
            $table->string('P12')->nullable();
            $table->string('P13')->nullable();
            $table->string('P14')->nullable();
            $table->string('P15')->nullable();
            $table->string('P16')->nullable();
            $table->string('P17')->nullable();
            $table->string('P18')->nullable();
            $table->string('P19')->nullable();
            $table->string('P20')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('32io_pump_setting', function (Blueprint $table) {
            $table->renameColumn('pump_name','P1');
            $table->renameColumn('pump_id','P2');
            $table->renameColumn('switchonoff','P3');
            $table->string('P4')->nullable();
            $table->string('P5')->nullable();
            $table->string('P6')->nullable();
            $table->string('P7')->nullable();
            $table->string('P8')->nullable();
            $table->string('P9')->nullable();
            $table->string('P10')->nullable();
            $table->string('P11')->nullable();
            $table->string('P12')->nullable();
            $table->string('P13')->nullable();
            $table->string('P14')->nullable();
            $table->string('P15')->nullable();
            $table->string('P16')->nullable();
            $table->string('P17')->nullable();
            $table->string('P18')->nullable();
            $table->string('P19')->nullable();
            $table->string('P20')->nullable();
        });
    }
}
