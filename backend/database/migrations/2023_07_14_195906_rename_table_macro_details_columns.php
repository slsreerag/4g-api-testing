<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTableMacroDetailsColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('macro_details', function (Blueprint $table) {
            $table->renameColumn('reservior_motor_pumping_time','flooding_duration');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('macro_details', function (Blueprint $table) {
            $table->renameColumn('reservior_motor_pumping_time','flooding_duration');
        });
    }
}
