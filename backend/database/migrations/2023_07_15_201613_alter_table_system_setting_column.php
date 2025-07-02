<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableSystemSettingColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('system_setting', function (Blueprint $table) {
            $table->renameColumn('water_quality_checking_start_time_delay','no_flow_interupt_time');
            $table->dropColumn('flooding_duration');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('system_setting', function (Blueprint $table) {
            $table->renameColumn('water_quality_checking_start_time_delay','no_flow_interupt_time');
            $table->dropColumn('flooding_duration');
        });
    }
}
