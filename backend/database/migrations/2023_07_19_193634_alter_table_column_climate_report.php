<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableColumnClimateReport extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('climate_report', function (Blueprint $table) {
            $table->dropColumn('water_temperature');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('climate_report', function (Blueprint $table) {
            $table->dropColumn('water_temperature');
        });
    }
}
