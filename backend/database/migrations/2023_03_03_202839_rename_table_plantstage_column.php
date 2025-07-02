<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTablePlantstageColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plants_stage', function (Blueprint $table) {
            $table->renameColumn('standard_quality_of_general_solution','standard_quantity_of_general_solution');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plants_stage', function (Blueprint $table) {
            $table->renameColumn('standard_quality_of_general_solution','standard_quantity_of_general_solution');
        });
    }
}
