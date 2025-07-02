<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTableDoserReportColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('doser_details', function (Blueprint $table) {
            $table->renameColumn('gp_1','card_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('doser_details', function (Blueprint $table) {
            $table->renameColumn('gp_1','card_id');
        });
    }
}
