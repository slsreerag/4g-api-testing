<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\MacroDetails;
use App\Models\User;
use App\Models\SyncStatus;
use Validator;
use DB;

class MacroController extends Controller
{
    public function macro_create(Request $request)
    {
        $loggedUser =  Auth::id(); 
        $macroId = $request->post('macro_details_id');
        $machine_id = $request->post('machine_id');
        $card_id = $request->post('card_id');
        $plant_id = $request->post('plant_id');
        $macro_id = $request->post('macro_id');
        $installation_date = $request->post('installation_date');
        $transplanting_date = $request->post('transplanting_date');
        $tank_capacity = $request->post('tank_capacity');
        $flooding_duration = $request->post('flooding_duration');
        $number_of_mini_units = $request->post('number_of_mini_units');
        $number_of_pots = $request->post('number_of_pots');
        $dosing_interval = $request->post('dosing_interval');
        $reservoir_mixing_duration = $request->post('reservoir_mixing_duration');
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
        


        $macro_arr = array();
        $macro_arr['machine_id'] = $machine_id;
        $macro_arr['card_id'] = $card_id;
        $macro_arr['plant_id'] = $plant_id;
        $macro_arr['macro_id'] = $macro_id;
        $macro_arr['installation_date'] = $installation_date;
        $macro_arr['transplanting_date'] = $transplanting_date;
        $macro_arr['tank_capacity'] = $tank_capacity;
        $macro_arr['flooding_duration'] = $flooding_duration;
        $macro_arr['number_of_mini_units'] = $number_of_mini_units;
        $macro_arr['number_of_pots'] = $number_of_pots;
        $macro_arr['dosing_interval'] = $dosing_interval;
        $macro_arr['reservoir_mixing_duration'] = $reservoir_mixing_duration;
        $macro_arr['status'] = config('constant.ACTIVE');

        if(!isset($macroId) && empty($macroId))
        {
            
            $macro_arr['created_by'] = $loggedUser;
            $macro_arr['response_status'] = 1;
            $modalData = MacroDetails::create($macro_arr);   
            
            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'macro_details';
            $device_response_arr['updated_data'] = $modalData->id;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::create($device_response_arr); 
            return response()->json(["message" => "Created successfully","status"=>True]); 
        }
        else{
            $macro_arr['updated_by'] = $loggedUser;
            $macro_arr['response_status'] = 1;
            $result = MacroDetails::where('id',$macroId)->update($macro_arr);   

            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'macro_details';
            $device_response_arr['updated_data'] = $macroId;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::where('machine_id',$machine_id)->where('table_name', 'macro_details')->where('updated_data', $macroId)->where('syncing_status',1)->first();
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

    public function macro_list(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $page=$request->get('page');
        $search_keyword=$request->post('search_keyword');
        $status = $request->post('status');
        $data_arr = array();
        $pagination_limit=$request->post('pagination_limit') ?? config('constant.PAGINATION_LIMIT');
        if(isset($page) && !empty($page))
        {
            $data=MacroDetails::with('get_plant');
            
            if($role_id==config('constant.ROLES.USER')){
    
                $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
                $data=$data->whereIn('machine_id',$machineIds);
            }

            if(isset($status) && !empty($status))
            {
                 $data = $data->where('status',$status); 
            }
            
            
            // if(isset($search_keyword) && !empty($search_keyword))
            // {
            //     $data = $data->where(DB::raw('lower(doser_id)'),"like", "%".strtolower($search_keyword)."%");
            // }


            $data=$data->orderBy('id', 'DESC');
            $data=$data->paginate($pagination_limit);
                            
        }
        else{
        $data=MacroDetails::with('get_plant')->where('status',config('constant.ACTIVE'))->orderBy('id', 'DESC')->get();
   
        }


        $data_arr['data'] = $data;
        return $data_arr;



    }

    public function edit_macro(Request $request)
    {
        $macro_id = Request('macro_details_id');
        $data = MacroDetails::where('id', $macro_id)->first();
        return $data;
    }

    public function getUsedMacroListMacroDetails(Request $request)
    {
        $machine_id = Request('machine_id');
        $card_id = Request('card_id');
        $data=MacroDetails::select('macro_id')->where('machine_id',$machine_id)->where('card_id',$card_id)->get();
        return $data;
    }
}
