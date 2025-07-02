<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
    Route::post('login', 'App\Http\Controllers\AuthController@login')->name('login');
    Route::get('get_doser_response','App\Http\Controllers\DoserController@get_doser_data');
    Route::get('get_climate_response','App\Http\Controllers\ClimateController@get_climate_data');
    Route::get('get_alert','App\Http\Controllers\AlertController@get_alert');
    Route::get('get_flow_alert','App\Http\Controllers\AlertController@get_flow_alert');
    Route::get('get_flooding_data','App\Http\Controllers\FloodingController@get_flooding_data');
    Route::get('get_draining_data','App\Http\Controllers\DrainingController@get_draining_data');
    Route::get('get_syncing_status_data','App\Http\Controllers\SyncStatusController@get_syncing_status_data');
    Route::get('get_response','App\Http\Controllers\ApiController@get_data');
    Route::get('get_status_control','App\Http\Controllers\ManualController@getstatus_control');
    Route::get('insert_data','App\Http\Controllers\ManualController@insertData');
    Route::get('get_system_warning','App\Http\Controllers\AlertController@get_system_warning');
    
    # aws api's
    Route::get('get_device_details','App\Http\Controllers\DataController@getDeviceData');
    Route::post('get_device_response','App\Http\Controllers\DataController@getDataResponse');
    Route::get('get_device_hourly_response',"App\Http\Controllers\DataController@hourlyDeviceData");

    Route::group(['middleware' => 'auth:api'], function() {

        #Doser Testing Section
       
        Route::post('get_doser_reports','App\Http\Controllers\DoserController@getDoserReportList');
        Route::get('get_machine_list','App\Http\Controllers\DoserController@getMachineList');
        Route::get('get_macro_list','App\Http\Controllers\DoserController@getMacroList');
        Route::get('get_plant_list','App\Http\Controllers\DoserController@getPlantList');
        Route::get('get_growth_stage_list','App\Http\Controllers\DoserController@getGrowthStageList');

        #4G API Testing Section
      
        Route::get('get_reports','App\Http\Controllers\ReportController@getReportList');

        #32IO Testing Section
        Route::get('get_pumps','App\Http\Controllers\ManualController@getPumpList');
        Route::post('get_devices_list','App\Http\Controllers\ManualController@getDeviceList');
        Route::post('get_32io_reports','App\Http\Controllers\ManualController@getReport');
        Route::post('update_status','App\Http\Controllers\ManualController@updatestatus_control');
        Route::post('create_relay_controls','App\Http\Controllers\ManualController@relay_create');
        Route::post('edit_relay','App\Http\Controllers\ManualController@edit_relay');
        Route::post('get_relay','App\Http\Controllers\ManualController@get_relay_status');
        Route::post('get_all_report','App\Http\Controllers\ManualController@getAllReport');
	Route::get('get_all_devices','App\Http\Controllers\ManualController@getAllDevices');

         //plant management
        Route::post('create_plant','App\Http\Controllers\PlantController@createPlant');
        Route::post('list_plant','App\Http\Controllers\PlantController@getPlantList');
        Route::post('edit_plant','App\Http\Controllers\PlantController@editPlant');
        Route::post('deactivate_plant','App\Http\Controllers\PlantController@destroy');
        Route::post('used_macro_list','App\Http\Controllers\PlantController@getMacroList');
        Route::post('get_plant_name','App\Http\Controllers\PlantController@getPlantName');

        // growth stage management
        Route::post('create_growth_stage','App\Http\Controllers\GrowthController@createGrowthStage');
        Route::post('list_growth_stage','App\Http\Controllers\GrowthController@getGrowthStageList');
        Route::post('edit_growth_stage','App\Http\Controllers\GrowthController@editGrowthStage');
        Route::post('used_macro_growth_stage','App\Http\Controllers\GrowthController@getUsedMacroListGrowthStage');

        // macro management
        Route::post('create_macro','App\Http\Controllers\MacroController@macro_create');
        Route::post('list_macro','App\Http\Controllers\MacroController@macro_list');
        Route::post('edit_macro','App\Http\Controllers\MacroController@edit_macro');
        Route::post('used_macro_macro_details','App\Http\Controllers\MacroController@getUsedMacroListMacroDetails');

         // system setting management
        Route::post('create_system_setting','App\Http\Controllers\SystemSettingController@system_setting_create');
        Route::post('list_system_setting','App\Http\Controllers\SystemSettingController@system_setting_list');
        Route::post('edit_system_setting','App\Http\Controllers\SystemSettingController@edit_system_setting');

         // dosing setting management
         Route::post('create_dosing_setting','App\Http\Controllers\DosingSettingController@dosing_setting_create');
         Route::post('list_dosing_setting','App\Http\Controllers\DosingSettingController@dosing_setting_list');
         Route::post('edit_dosing_setting','App\Http\Controllers\DosingSettingController@edit_dosing_setting');

        // climate reports
        Route::post('get_climate_reports','App\Http\Controllers\ClimateController@getClimateReportList');

        // power alerts
        Route::post('get_alert_list','App\Http\Controllers\AlertController@getAlertsList');

         // flow alerts
        Route::post('get_flow_alert_list','App\Http\Controllers\AlertController@getFlowAlertsList');
         
        // system warnings
        Route::post('get_system_warning_list','App\Http\Controllers\AlertController@getSystemWarningList');
        
        // flooding reports
        Route::post('get_flooding_list','App\Http\Controllers\FloodingController@getFloodReport');

         // draining reports
        Route::post('get_draining_list','App\Http\Controllers\DrainingController@getDrainingReport');
        
        // syncing reports
        Route::post('get_sync_status_list','App\Http\Controllers\SyncStatusController@getSyncStatusReport');

         Route::post('machine_list','App\Http\Controllers\PlantController@getMachineList');
         Route::post('card_list','App\Http\Controllers\PlantController@getCardList');
         Route::get('get_used_machine_system','App\Http\Controllers\SystemSettingController@getSystemUsedMachine');
         Route::get('get_used_machine_dosing','App\Http\Controllers\DosingSettingController@getDosingUsedMachine');
    });

