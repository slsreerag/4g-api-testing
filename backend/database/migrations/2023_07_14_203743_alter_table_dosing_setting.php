<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableDosingSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dosing_time_settings', function (Blueprint $table) {
            $table->renameColumn('testing_start_htime1','testing_interval');
            $table->renameColumn('testing_start_htime2','climate_value_check_interval');
            $table->renameColumn('testing_start_htime3','container_level_check_interval');
            $table->renameColumn('testing_start_htime4','draining_pots_on_time_interval');
            $table->renameColumn('testing_start_mtime1','draining_pots_off_time_interval');
            $table->dropColumn('testing_start_mtime2');
            $table->dropColumn('testing_start_mtime3');
            $table->dropColumn('testing_start_mtime4');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dosing_time_settings', function (Blueprint $table) {
            $table->renameColumn('testing_start_htime1','testing_interval');
            $table->renameColumn('testing_start_htime2','climate_value_check_interval');
            $table->renameColumn('testing_start_htime3','container_level_check_interval');
            $table->renameColumn('testing_start_htime4','draining_pots_on_time_interval');
            $table->renameColumn('testing_start_mtime1','draining_pots_off_time_interval');
            $table->dropColumn('testing_start_mtime2');
            $table->dropColumn('testing_start_mtime3');
            $table->dropColumn('testing_start_mtime4');
        });
    }
}
