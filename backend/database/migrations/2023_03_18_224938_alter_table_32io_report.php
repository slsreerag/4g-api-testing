<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTable32ioReport extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('32io_report', function (Blueprint $table) {
            $table->renameColumn('power_sts','P1');
            $table->renameColumn('r_voltage','P2');
            $table->renameColumn('y_voltage','P3');
            $table->renameColumn('b_voltage','P4');
            $table->renameColumn('r_presence','P5');
            $table->renameColumn('y_presence','P6');
            $table->renameColumn('b_presence','P7');
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
            $table->string('P21')->nullable();
            $table->string('P22')->nullable();
            $table->string('P23')->nullable();
            $table->string('P24')->nullable();
            $table->string('P25')->nullable();
            $table->string('P26')->nullable();
            $table->string('P27')->nullable();
            $table->string('P28')->nullable();
            $table->string('P29')->nullable();
            $table->string('P30')->nullable();
            $table->string('P31')->nullable();
            $table->string('P32')->nullable();
            $table->string('P33')->nullable();
            $table->string('P34')->nullable();
            $table->string('P35')->nullable();
            $table->string('P36')->nullable();
            $table->string('P37')->nullable();
            $table->string('P38')->nullable();
            $table->string('P39')->nullable();
            $table->string('P40')->nullable();
            $table->string('P41')->nullable();
            $table->string('P42')->nullable();
            $table->string('P43')->nullable();
            $table->string('P44')->nullable();
            $table->string('P45')->nullable();
            $table->string('P46')->nullable();
            $table->string('P47')->nullable();
            $table->string('P48')->nullable();
            $table->string('P49')->nullable();
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('32io_report', function (Blueprint $table) {
            $table->renameColumn('power_sts','P1');
            $table->renameColumn('r_voltage','P2');
            $table->renameColumn('y_voltage','P3');
            $table->renameColumn('b_voltage','P4');
            $table->renameColumn('r_presence','P5');
            $table->renameColumn('y_presence','P6');
            $table->renameColumn('b_presence','P7');
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
            $table->string('P21')->nullable();
            $table->string('P22')->nullable();
            $table->string('P23')->nullable();
            $table->string('P24')->nullable();
            $table->string('P25')->nullable();
            $table->string('P26')->nullable();
            $table->string('P27')->nullable();
            $table->string('P28')->nullable();
            $table->string('P29')->nullable();
            $table->string('P30')->nullable();
            $table->string('P31')->nullable();
            $table->string('P32')->nullable();
            $table->string('P33')->nullable();
            $table->string('P34')->nullable();
            $table->string('P35')->nullable();
            $table->string('P36')->nullable();
            $table->string('P37')->nullable();
            $table->string('P38')->nullable();
            $table->string('P39')->nullable();
            $table->string('P40')->nullable();
            $table->string('P41')->nullable();
            $table->string('P42')->nullable();
            $table->string('P43')->nullable();
            $table->string('P44')->nullable();
            $table->string('P45')->nullable();
            $table->string('P46')->nullable();
            $table->string('P47')->nullable();
            $table->string('P48')->nullable();
            $table->string('P49')->nullable();
           
        });
    }
}
