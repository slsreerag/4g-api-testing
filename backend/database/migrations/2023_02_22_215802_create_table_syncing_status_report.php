<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSyncingStatusReport extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('syncing_status_report', function (Blueprint $table) {
            $table->id();
            $table->string('machine_id');
            $table->string('login_id');
            $table->string('updated_date');
            $table->string('updated_time');
            $table->string('table_name');
            $table->string('updated_data');
            $table->string('syncing_status');
            $table->string('last_updated_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('syncing_status_report');
    }
}
