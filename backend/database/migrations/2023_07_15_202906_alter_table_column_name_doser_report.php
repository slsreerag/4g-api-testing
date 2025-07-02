<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableColumnNameDoserReport extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('doser_details', function (Blueprint $table) {
            $table->renameColumn('post_tds','target_tds');
            $table->renameColumn('post_ph','target_ph');
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
            $table->renameColumn('post_tds','target_tds');
            $table->renameColumn('post_ph','target_ph');
        });
    }
}
