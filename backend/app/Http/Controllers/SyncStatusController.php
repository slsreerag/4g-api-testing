<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\SyncStatus;
use App\Models\Plants;
use App\Models\GrowthStage;
use App\Models\MacroDetails;
use App\Models\SystemSetting;
use App\Models\DosingSetting;
use App\Models\User;
use DB;

class SyncStatusController extends Controller
{
    public function get_syncing_status_data(Request $request)
    {
        // try {

            $machine_id = $request->get('machine_id');
            $table_name = $request->get('table_name');
            $updated_data = $request->get('updated_data');
            $syncing_status = $request->get('syncing_status');

            $ids=explode(',',$updated_data);
            if( $table_name=="plant_details")
            {
                foreach ($ids as $Ids)
                {     
                  Plants::where('id',$Ids)->where('machine_id',$machine_id)->update(['response_status'=>$syncing_status]);
                  SyncStatus::where('updated_data',$Ids)->where('machine_id',$machine_id)->where('table_name','plant_details')->where('syncing_status',1)->update(['syncing_status'=>$syncing_status,'last_updated_time'=>1]);
                  
                }

            }
            if( $table_name=="growth_stage")
            {
                foreach ($ids as $Ids)
                {     
                  GrowthStage::where('id',$Ids)->where('machine_id',$machine_id)->update(['response_status'=>$syncing_status]);
                  SyncStatus::where('updated_data',$Ids)->where('machine_id',$machine_id)->where('table_name','growth_stage')->where('syncing_status',1)->update(['syncing_status'=>$syncing_status,'last_updated_time'=>1]);
                 
                }

            }

            if( $table_name=="macro_details")
            {
                foreach ($ids as $Ids)
                {     
                    MacroDetails::where('id',$Ids)->where('machine_id',$machine_id)->update(['response_status'=>$syncing_status]);
                    SyncStatus::where('updated_data',$Ids)->where('machine_id',$machine_id)->where('table_name','macro_details')->where('syncing_status',1)->update(['syncing_status'=>$syncing_status,'last_updated_time'=>1]);   
                }

            }
            if( $table_name=="system_setting")
            {
                foreach ($ids as $Ids)
                {     
                    SystemSetting::where('id',$Ids)->where('machine_id',$machine_id)->update(['response_status'=>$syncing_status]);
                    SyncStatus::where('updated_data',$Ids)->where('machine_id',$machine_id)->where('table_name','system_setting')->where('syncing_status',1)->update(['syncing_status'=>$syncing_status,'last_updated_time'=>1]); 
                }

            }

            if( $table_name=="dosing_time_settings")
            {
                foreach ($ids as $Ids)
                {     
                    DosingSetting::where('id',$Ids)->where('machine_id',$machine_id)->update(['response_status'=>$syncing_status]);
                    SyncStatus::where('updated_data',$Ids)->where('machine_id',$machine_id)->where('table_name','dosing_time_settings')->where('syncing_status',1)->update(['syncing_status'=>$syncing_status,'last_updated_time'=>1]);
                }

            }
            
            // $device_response_arr = [];
            // $device_response_arr['machine_id'] = $machine_id;
            // $device_response_arr['login_id'] = $login_id;
            // $device_response_arr['updated_date'] = 0;
            // $device_response_arr['updated_time'] = 0;
            // $device_response_arr['table_name'] = $table_name;
            // $device_response_arr['updated_data'] = $updated_data;
            // $device_response_arr['syncing_status'] = $syncing_status;
            // $device_response_arr['last_updated_time'] = 0;
            // SyncStatus::create($device_response_arr);


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
    }

    public function getSyncStatusReport(Request $request)
    {

        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  

        $data_arr = array();
        $page = $request->get('page');
        $pagination_limit = 20;
        $data  = SyncStatus::with('get_user')->orderBy('created_at', 'desc');


        if($role_id==config('constant.ROLES.USER')){

            $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
            $data=$data->whereIn('machine_id',$machineIds);
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
}
