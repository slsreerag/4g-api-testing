<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\DoserReports;
use App\Models\Plants;
use App\Models\GrowthStage;
use App\Models\MacroDetails;
use App\Models\SystemSetting;
use App\Models\DosingSetting;
use App\Models\SyncStatus;
use App\Models\User;
use DB;

class DoserController extends Controller
{
    public function get_doser_data(Request $request)
    {
        // try {

            $machine_id = $request->get('machine_id');
            $macro_id = $request->get('macro_id');
            $growth_stage = $request->get('growth_stage');
            $date = $request->get('date');
            $time = $request->get('time');
            $pre_tds = $request->get('pre_tds');
            $target_tds = $request->get('target_tds');
            $pre_ph = $request->get('pre_ph');
            $target_ph = $request->get('target_ph');
            $motor_a_time = $request->get('motor_a_time');
            $motor_b_time = $request->get('motor_b_time');
            $motor_acid_time = $request->get('motor_acd_time');
            $motor_alk_time = $request->get('motor_alk_time');
            $motor_cmg_time = $request->get('motor_cmg_time');
            $ph_update = $request->get('ph_update');
            $tds_update = $request->get('tds_update');
            $cal_mg_update = $request->get('cal_mg_update');
            $report_id = $request->get('report_id');
            $plant_name = $request->get('plant_name');
            $card_id = $request->get('card_id');
            $water_temperature = $request->get('water_temperature');


            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['macro_id'] = $macro_id;
            $device_response_arr['growth_stage'] = $growth_stage;
            $device_response_arr['date'] = $date;
            $device_response_arr['time'] = $time;
            $device_response_arr['pre_tds'] = $pre_tds;
            $device_response_arr['target_tds'] = $target_tds;
            $device_response_arr['pre_ph'] = $pre_ph;
            $device_response_arr['target_ph'] = $target_ph;
            $device_response_arr['motor_a_time'] = $motor_a_time;
            $device_response_arr['motor_b_time'] = $motor_b_time;
            $device_response_arr['motor_acd_time'] = $motor_acid_time;
            $device_response_arr['motor_alk_time'] = $motor_alk_time;
            $device_response_arr['motor_cmg_time'] = $motor_cmg_time;
            $device_response_arr['ph_update'] = $ph_update;
            $device_response_arr['tds_update'] = $tds_update;
            $device_response_arr['cal_mg_update'] = $cal_mg_update;
            $device_response_arr['report_id'] = $report_id;
            $device_response_arr['plant_name'] = $plant_name;
            $device_response_arr['card_id'] = $card_id;
            $device_response_arr['water_temperature'] = $water_temperature;
            $device_response_arr['time_since_last_update'] = 0;
            DoserReports::create($device_response_arr);

            $plant_details = Plants::with('get_growth_setting')
                            ->where('machine_id',$machine_id)
                            ->where('response_status',1)
                            // ->where('status',config('constant.ACTIVE'))
                            // ->orderBy('updated_at','DESC')
                            ->limit(20)
                            ->get();


            if(count($plant_details)>0)
            { 
                $plantDetails1 = SyncStatus::where('table_name','plant_details')
                            ->where('machine_id',$machine_id)
                            ->where('syncing_status',1)
                            ->limit(20)
                            ->get();
                $ids=$plantDetails1->pluck('updated_data');
                // foreach ($plant_details1 as $plantDetails1)
                // {     
                $plant_data=Plants::with('get_growth_setting')->whereIn('id',$ids)->where('machine_id',$machine_id)->where('response_status',1)->get();

                //  }                    
                return response()->json(["message" => "Success","status"=>True,"plant_details"=>$plant_data]);

            } 

            $growth_details = GrowthStage::with('get_growth_stage')
                                ->where('machine_id',$machine_id)
                                ->where('response_status',1)
                                ->where('status',config('constant.ACTIVE'))
                                ->limit(20)
                                ->get();
            if(count($plant_details)==0 and count($growth_details)>0)
            {
                $growthDetails1 = SyncStatus::where('table_name','growth_stage')
                                    ->where('machine_id',$machine_id)
                                    ->where('syncing_status',1)
                                    ->limit(20)
                                    ->get();
                $ids=$growthDetails1->pluck('updated_data');
                $growth_data=GrowthStage::with('get_growth_stage')->whereIn('id',$ids)->where('machine_id',$machine_id)->where('response_status',1)->get();
                return response()->json(["message" => "Success","status"=>True,"growth_stage"=>$growth_data]);
            }

            $macro_details = MacroDetails::where('machine_id',$machine_id)
                            ->where('response_status',1)
                            ->where('status',config('constant.ACTIVE'))
                            ->limit(20)
                            ->get();

            if(count($plant_details)==0 and count($growth_details)==0 and count($macro_details)>0)
            {
                $macroDetails1 = SyncStatus::where('table_name','macro_details')
                                ->where('machine_id',$machine_id)
                                ->where('syncing_status',1)
                                ->limit(20)
                                ->get();
                $ids=$macroDetails1->pluck('updated_data');
                $macro_data=MacroDetails::whereIn('id',$ids)->where('machine_id',$machine_id)->where('response_status',1)->get();
            return response()->json(["message" => "Success","status"=>True,"macro_details"=>$macro_data]);
            }

             $system_setting = SystemSetting::where('machine_id',$machine_id)
                                ->where('response_status',1)
                                ->where('status',config('constant.ACTIVE'))
                                ->limit(20)
                                ->get();
            if(count($plant_details)==0 and count($growth_details)==0 and count($macro_details)==0 and count($system_setting)>0)
            {
                $settingDetails1 = SyncStatus::where('table_name','system_setting')
                                    ->where('machine_id',$machine_id)
                                    ->where('syncing_status',1)
                                    ->limit(20)
                                    ->get();
                $ids=$settingDetails1->pluck('updated_data');
                $settings_data=SystemSetting::whereIn('id',$ids)->where('machine_id',$machine_id)->where('response_status',1)->get();
                return response()->json(["message" => "Success","status"=>True,"system_setting"=>$settings_data]);
            }  

                $dosing_setting = DosingSetting::where('machine_id',$machine_id)
                                    ->where('response_status',1)
                                    ->where('status',config('constant.ACTIVE'))
                                    ->limit(20)
                                    ->get();
            if(count($plant_details)==0 and count($growth_details)==0 and count($macro_details)==0 and count($system_setting)==0 and count($dosing_setting)>0)
            {
                $dosingDetails1 = SyncStatus::where('table_name','dosing_time_settings')
                                    ->where('machine_id',$machine_id)
                                    ->where('syncing_status',1)
                                    ->limit(20)
                                    ->get();
                $ids=$dosingDetails1->pluck('updated_data');
                $dosing_data=DosingSetting::whereIn('id',$ids)->where('machine_id',$machine_id)->where('response_status',1)->get();
                return response()->json(["message" => "Success","status"=>True,"dosing_time_settings"=>$dosing_data]);
            }  
            else{
                return response()->json(["message" => "Success","status"=>True]);
            }    
            
           
        // } 
        // catch (\Illuminate\Database\QueryException $ex) {
        //     $error      = $ex->getMessage();
        //     $data       = array('status' => 'DB_ERROR');
        //     return $data;
        // }
    }


    public function getDoserReportList(Request $request)
    {

        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  

        $data_arr = array();
        $page = $request->get('page');
        $machine_id = $request->post('machine_id');
        $macro_id = $request->post('macro_id');
        $from_date = $request->post('from_date');
        $to_date = $request->post('to_date');
        $plant = $request->post('plant_name');
        $growth_stage = $request->post('growth_stage');
        $pagination_limit = 20;
        $data  = DoserReports::orderBy('created_at', 'desc');


        if($role_id==config('constant.ROLES.USER')){

            $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
            $data=$data->whereIn('machine_id',$machineIds);
        }

        if(isset($machine_id) && !empty($machine_id))
        {
            $data = $data->where('machine_id',$machine_id);
        }
        if(isset($macro_id) && !empty($macro_id))
        {
            $data = $data->where('macro_id',$macro_id);
        }
        if(isset($from_date) && !empty($from_date))
       {
           $data=$data->where('date','>=',$from_date);

       }
       if(isset($to_date)  && !empty($to_date))
       {
           $data=$data->where('date','<=',$to_date);

       }
        if(isset($plant) && !empty($plant))
        {
            $data = $data->where('plant_name',$plant);
        }

        if(isset($growth_stage) && !empty($growth_stage))
        {
            $data = $data->where('growth_stage',$growth_stage);
        }

        if (isset($page) && !empty($page)) {

            $data = $data->paginate($pagination_limit);
        } 
        
        
        else {
            $data = $data->get();
        }
        $data_arr['data'] = $data;
        return $data_arr;
    }

    public function getMachineList(Request $request)
    {

        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        if($role_id==config('constant.ROLES.USER')){

            $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
            $data = DoserReports::select('machine_id')->distinct()->whereIn('machine_id',$machineIds)
                                  ->get();
        }
        else{
            $data = DoserReports::select('machine_id')->distinct()
                              ->get();

        }
        
        return $data;
    }

    public function getMacroList(Request $request)
    {
        $data = DoserReports::select('macro_id')->distinct()
                              ->get();
        return $data;
    }

    public function getPlantList(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        if($role_id==config('constant.ROLES.USER')){

            $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
            $data = DoserReports::select('plant_name')->distinct()->whereIn('machine_id',$machineIds)
                                  ->get();
        }
        else{
            $data = DoserReports::select('plant_name')->distinct()
                              ->get();
        }
        
        return $data;
    }

    public function getGrowthStageList(Request $request)
    {
        $data = DoserReports::select('growth_stage')->distinct()
                              ->get();
        return $data;
    }
}
