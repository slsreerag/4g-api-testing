<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\SystemSetting;
use App\Models\User;
use App\Models\SyncStatus;
use Validator;
use DB;

class SystemSettingController extends Controller
{
    public function system_setting_create(Request $request)
    {
        $loggedUser =  Auth::id(); 
        $SettingId = $request->post('system_setting_id');
        $machine_id = $request->post('machine_id');
        $intake_timeout = $request->post('intake_timeout');
        $draining_timeout = $request->post('draining_timeout');
        $serial_port_data_timeout = $request->post('serial_port_data_timeout');
        $no_flow_interupt_time = $request->post('no_flow_interupt_time');
        $tds_minimum_threshold = $request->post('tds_minimum_threshold');
        $sample_solution_mixing_time = $request->post('sample_solution_mixing_time');
        $minimum_dosing_motor_on_time_a = $request->post('minimum_dosing_motor_on_time_a');
        $minimum_dosing_motor_on_time_b = $request->post('minimum_dosing_motor_on_time_b');
        $minimum_dosing_motor_on_time_alkali = $request->post('minimum_dosing_motor_on_time_alkali');
        $minimum_dosing_motor_on_time_acid = $request->post('minimum_dosing_motor_on_time_acid');
        $minimum_dosing_motor_on_time_gp = $request->post('minimum_dosing_motor_on_time_gp');
        $minimum_dosing_quantity = $request->post('minimum_dosing_quantity');
        $mixer_capacity = $request->post('mixer_capacity');
        $draining_duration = $request->post('draining_duration');
        $system_shutdown_waiting_time = $request->post('system_shutdown_waiting_time');
        $tds_dosing_enable = $request->post('tds_dosing_enable');
        $ph_dosing_enable = $request->post('ph_dosing_enable');
        $gp_dosing_enable = $request->post('gp_dosing_enable');
        $loggedUser =  Auth::User()->id;

        $rule = [
            // 'doser_id' => 'required|unique:agri_dosers,doser_id,' . (!empty($doserId) ? $doserId : 'NULL') . ',id',

        ];
      

        $validator = Validator::make($request->all(), $rule);
        if ($validator->fails()) {
            $result_arr = array('status' => False,);
            $result_arr['response'] = $validator->errors();
            return json_encode($result_arr);
        }
        


        $setting_arr = array();
        $setting_arr['machine_id'] = $machine_id;
        $setting_arr['intake_timeout'] = $intake_timeout;
        $setting_arr['draining_timeout'] = $draining_timeout;
        $setting_arr['serial_port_data_timeout'] = $serial_port_data_timeout;
        $setting_arr['no_flow_interupt_time'] = $no_flow_interupt_time;
        $setting_arr['tds_minimum_threshold'] = $tds_minimum_threshold;
        $setting_arr['sample_solution_mixing_time'] = $sample_solution_mixing_time;
        $setting_arr['minimum_dosing_motor_on_time_a'] = $minimum_dosing_motor_on_time_a;
        $setting_arr['minimum_dosing_motor_on_time_b'] = $minimum_dosing_motor_on_time_b;
        $setting_arr['minimum_dosing_motor_on_time_alkali'] = $minimum_dosing_motor_on_time_alkali;
        $setting_arr['minimum_dosing_motor_on_time_acid'] = $minimum_dosing_motor_on_time_acid;
        $setting_arr['minimum_dosing_motor_on_time_gp'] = $minimum_dosing_motor_on_time_gp;
        $setting_arr['minimum_dosing_quantity'] = $minimum_dosing_quantity;
        $setting_arr['mixer_capacity'] = $mixer_capacity;
        $setting_arr['draining_duration'] = $draining_duration;
        $setting_arr['system_shutdown_waiting_time'] = $system_shutdown_waiting_time;
        $setting_arr['tds_dosing_enable'] = $tds_dosing_enable;
        $setting_arr['ph_dosing_enable'] = $ph_dosing_enable;
        $setting_arr['gp_dosing_enable'] = $gp_dosing_enable;
        $setting_arr['status'] = config('constant.ACTIVE');

        if(!isset($SettingId) && empty($SettingId))
        {
            
            $setting_arr['created_by'] = $loggedUser;
            $setting_arr['response_status'] = 1;
            $modalData = SystemSetting::create($setting_arr);    

            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'system_setting';
            $device_response_arr['updated_data'] = $modalData->id;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::create($device_response_arr);
            
            
            return response()->json(["message" => "Created successfully","status"=>True]); 
        }
        else{
            $setting_arr['updated_by'] = $loggedUser;
            $setting_arr['response_status'] = 1;
            $result = SystemSetting::where('id',$SettingId)->update($setting_arr);  
            
            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'system_setting';
            $device_response_arr['updated_data'] = $SettingId;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::where('machine_id',$machine_id)->where('table_name', 'system_setting')->where('updated_data', $SettingId)->where('syncing_status',1)->first();
            if(isset($sync_data))
            {
                $sync_data =  SyncStatus::where('id', $sync_data->id)->update($device_response_arr);
            }
            else
            {
                $sync_data = SyncStatus::create($device_response_arr);  
            } 


            return response()->json(["message" => "Updated successfully","status"=>True]); 
        }

    }

    public function system_setting_list(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $page=$request->get('page');
        $search_keyword=$request->post('search_keyword');
        $data_arr = array();
        $pagination_limit=$request->post('pagination_limit') ?? config('constant.PAGINATION_LIMIT');
        if(isset($page) && !empty($page))
        {
            $data=SystemSetting::orderBy('id', 'DESC');
            
            if($role_id==config('constant.ROLES.USER')){
    
                $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
                $data=$data->whereIn('machine_id',$machineIds);
            }
            
            
            // if(isset($search_keyword) && !empty($search_keyword))
            // {
            //     $data = $data->where(DB::raw('lower(doser_id)'),"like", "%".strtolower($search_keyword)."%");
            // }


            // $data=$data->orderBy('id', 'DESC');
            $data=$data->paginate($pagination_limit);
                            
        }
        else{
        $data=SystemSetting::where('status',config('constant.ACTIVE'))->orderBy('id', 'DESC')->get();
   
        }


        $data_arr['data'] = $data;
        return $data_arr;



    }

    public function edit_system_setting(Request $request)
    {
        $system_setting_id = Request('system_setting_id');
        $data = SystemSetting::where('id', $system_setting_id)->first();
        return $data;
    }

    public function getSystemUsedMachine(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $system_data=SystemSetting::pluck('machine_id');
        if($role_id==config('constant.ROLES.USER')){

            $data=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'));
        }
        else
        {

            $data = User::select('machine_id')->whereNotNull('machine_id');
        }
        $machine_data=$data->whereNotIn('machine_id',$system_data)->get();
        return $machine_data;
    }
}
