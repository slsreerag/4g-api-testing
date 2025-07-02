<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\DosingSetting;
use App\Models\User;
use App\Models\SyncStatus;
use Validator;
use DB;

class DosingSettingController extends Controller
{
    public function dosing_setting_create(Request $request)
    {
        $loggedUser =  Auth::id(); 
        $SettingId = $request->post('dosing_setting_id');
        $machine_id = $request->post('machine_id');
        $testing_interval = $request->post('testing_interval');
        $climate_value_check_interval = $request->post('climate_value_check_interval');
        $container_level_check_interval = $request->post('container_level_check_interval');
        $draining_pots_on_time_interval = $request->post('draining_pots_on_time_interval');
        $draining_pots_off_time_interval = $request->post('draining_pots_off_time_interval');
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
        $setting_arr['testing_interval'] = $testing_interval;
        $setting_arr['climate_value_check_interval'] = $climate_value_check_interval;
        $setting_arr['container_level_check_interval'] = $container_level_check_interval;
        $setting_arr['draining_pots_on_time_interval'] = $draining_pots_on_time_interval;
        $setting_arr['draining_pots_off_time_interval'] = $draining_pots_off_time_interval;
        $setting_arr['status'] = config('constant.ACTIVE');

        if(!isset($SettingId) && empty($SettingId))
        {
            
            $setting_arr['created_by'] = $loggedUser;
            $setting_arr['response_status'] = 1;
            $modalData = DosingSetting::create($setting_arr);    

            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'dosing_time_settings';
            $device_response_arr['updated_data'] = $modalData->id;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::create($device_response_arr);
            
            
            return response()->json(["message" => "Created successfully","status"=>True]); 
        }
        else{
            $setting_arr['updated_by'] = $loggedUser;
            $setting_arr['response_status'] = 1;
            $result = DosingSetting::where('id',$SettingId)->update($setting_arr);  
            
            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'dosing_time_settings';
            $device_response_arr['updated_data'] = $SettingId;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::where('machine_id',$machine_id)->where('table_name', 'dosing_time_settings')->where('updated_data', $SettingId)->where('syncing_status',1)->first();
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

    public function dosing_setting_list(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $page=$request->get('page');
        $search_keyword=$request->post('search_keyword');
        $data_arr = array();
        $pagination_limit=$request->post('pagination_limit') ?? config('constant.PAGINATION_LIMIT');
        if(isset($page) && !empty($page))
        {
            $data=DosingSetting::orderBy('id', 'DESC');
            
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
        $data=DosingSetting::where('status',config('constant.ACTIVE'))->orderBy('id', 'DESC')->get();
   
        }


        $data_arr['data'] = $data;
        return $data_arr;



    }

    public function edit_dosing_setting(Request $request)
    {
        $dosing_setting_id = Request('dosing_setting_id');
        $data = DosingSetting::where('id', $dosing_setting_id)->first();
        return $data;
    }

    public function getDosingUsedMachine(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $system_data=DosingSetting::pluck('machine_id');
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
