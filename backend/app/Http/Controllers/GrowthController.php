<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\GrowthStage;
use App\Models\GrowthStageDetails;
use App\Models\User;
use App\Models\SyncStatus;
use Validator;
use DB;

class GrowthController extends Controller
{
    public function createGrowthStage(Request $request)
    {
        $arr = array();
        $config = array();
        $commandExs = array();

        $loggedUser =  Auth::User()->id;
      
        $GrowthId = $request->post('growth_stage_id');
        $machine_id=$request->post('machine_id');
        $arr['machine_id'] = $request->post('machine_id');
        $arr['card_id'] = $request->post('card_id');
        $arr['macro_id'] = $request->post('macro_id');
        $arr['plant_id'] = $request->post('plant_id');
        $arr['status'] = config('constant.ACTIVE');
        $details = array();
        $details = $request->post("growth_details");       
        $ids = array();   

       

/******************Validation********************************** */
        $rule = [
                    'growth_details'=>['required', 'array'], 
                   
                ];

        $validator = Validator::make($request->all(),$rule);
        if ($validator->fails())
        {
            $result_arr= array('status'=>False,);
            $result_arr['response'] = $validator->errors();
            return json_encode($result_arr);
        }

        for($m=0;$m<count($details);$m++)
        {

            $rule2 = [
                'growth_details.'.$m.'.stage' => 'required',
                'growth_details.'.$m.'.starting_day' => 'required',
                'growth_details.'.$m.'.ending_day' => 'required',
                'growth_details.'.$m.'.gp_container_interval' => 'required',
            ];

            $custom_msg = [
                'growth_details.'.$m.'.stage.required' => 'Stage is required',
                'growth_details.'.$m.'.starting_day.required' => 'Starting day is required',
                'growth_details.'.$m.'.ending_day.required' => 'Ending day  is required',
                'growth_details.'.$m.'.gp_container_interval.required' => 'Gp container interval is required',
                
            ];

            $validator2 = Validator::make($request->all(),$rule2, $custom_msg);
            if ($validator2->fails())
            {
                $result_arr2= array('status'=>False,);
                $result_arr2['response'] = $validator2->errors();
                return json_encode($result_arr2);
            }  
        }

       


        if(!isset( $GrowthId ) && empty( $GrowthId ))
        {
           
            $arr['created_by'] = $loggedUser;
            $arr['response_status'] = 1;
            $data = GrowthStage::create($arr);      
            
            $device_response_arr = [];
            $device_response_arr['machine_id'] = $request->post('machine_id');;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'growth_stage';
            $device_response_arr['updated_data'] = $data->id;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::create($device_response_arr);

            if(isset($data->id))
            {
                $config['growth_stage_id'] = $data->id;
                $config['status'] = config('constant.ACTIVE');
                $config['created_by'] = $loggedUser;

                for($i=0;$i<count($details);$i++)
                {
                    $config['stage'] = $details[$i]['stage'];
                    $config['starting_day'] = $details[$i]['starting_day'];
                    $config['ending_day'] = $details[$i]['ending_day'];
                    $config['gp_container_interval'] = $details[$i]['gp_container_interval'];
                    $result = GrowthStageDetails::create( $config);  
                }
            }    
            return response()->json(["message" => "Created successfully","status"=>True]);
        }
        else{
            $config['growth_stage_id'] = $GrowthId;
            $config['status'] = config('constant.ACTIVE');
            $config['updated_by'] = $loggedUser;

            $arr['updated_by'] = $loggedUser;
            $arr['response_status'] = 1;

            $data = GrowthStage::where('id', $GrowthId)->update($arr);

            $device_response_arr = [];
            $device_response_arr['machine_id'] = $request->post('machine_id');;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'growth_stage';
            $device_response_arr['updated_data'] = $GrowthId;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::where('machine_id',$machine_id)->where('table_name','growth_stage')->where('updated_data', $GrowthId)->where('syncing_status',1)->first();
            if(isset($sync_data))
            {
                $sync_data =  SyncStatus::where('id', $sync_data->id)->update($device_response_arr);
            }
            else
            {
                $sync_data = SyncStatus::create($device_response_arr);  
            }

            $ids = GrowthStageDetails::select('id')->where('growth_stage_id',$GrowthId)->get()->toArray();
            $del_config = array();     
            for($j=0;$j<count($ids);$j++)
            {
                $idVal = $ids[$j]['id'];
   
              
                for($i=0;$i<count($details);$i++)
                {
                   
                

                    if(isset($details[$i]['id']))
                    {
                       
                        if(isset($details[$i]['starting_day']) && isset($details[$i]['ending_day'])  && isset($details[$i]['gp_container_interval']) && isset($details[$i]['stage'] ) )
                        {
                             
                    
                            if(isset($details[$i]['id']) && !empty($details[$i]['id']))
                            {      
                                    
                                $config['stage'] = $details[$i]['stage'];
                                $config['starting_day'] = $details[$i]['starting_day'];
                                $config['ending_day'] = $details[$i]['ending_day'];
                                $config['gp_container_interval'] = $details[$i]['gp_container_interval'];
                                $config['status'] = config('constant.ACTIVE');
                                $config['updated_by'] = $loggedUser;

                                if(array_search($ids[$j]['id'], array_column($details, 'id')) !== False)
                                {
                                  
                                    //echo "Value Present in Array---ID====".$ids[$j]['id'];
                                    $result = GrowthStageDetails::where('id',$details[$i]['id'])->update($config);                            
                                }
                            
                                else{
                                   
                                    // echo "Value Not Found-----ID=====".$ids[$j]['id'];
                                    $del_config['status'] = config('constant.INACTIVE');
                                    $del_config['deleted_at'] = now();
                                    $del_config['updated_by'] = $loggedUser;

                                    $result = GrowthStageDetails::where('id',$idVal)->update( $del_config);                            
                                }                       
                            }
                            
                        }
                    }
                  
                }
            } 
            for($k=0;$k<count($details);$k++)
            {
              
                if(!isset($details[$k]['id']) && empty($details[$k]['id']))
                {
                   //echo "new One";
                    if(isset($details[$k]['starting_day']) && isset($details[$k]['ending_day']) && isset($details[$k]['gp_container_interval']) && isset($details[$k]['stage']))
                    {
                        $config['stage'] = $details[$k]['stage'];
                        $config['starting_day'] = $details[$k]['starting_day'];
                        $config['ending_day'] = $details[$k]['ending_day'];
                        $config['gp_container_interval'] = $details[$k]['gp_container_interval'];
                        $config['status'] = config('constant.ACTIVE');
                        $config['created_by'] = $loggedUser;
                        $result = GrowthStageDetails::create($config);
                    }
                 
                }                
                  
            }
            
           return response()->json(["message" => "updated successfully","status"=>True]);      
            
        }

    

    }


    public function getGrowthStageList(Request $request)
    {
        $page = $request->get('page');
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $search_keyword = $request->post('search_keyword');
        $status = $request->post('status');
    
        $data = array();

     
        $data = GrowthStage::with('get_growth_stage','get_plant')->orderBy('created_at','DESC');

      
        $pagination_limit = $request->post('pagination_limit') ?? config('constant.PAGINATION_LIMIT');


        
        if($role_id==config('constant.ROLES.USER')){

            $machineIds=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
            $data=$data->whereIn('machine_id',$machineIds);
        }

        if(isset($search_keyword) && !empty($search_keyword))
        {             
             $data = $data->where(DB::raw('lower(plant_name)'), "like", "%".strtolower($search_keyword)."%");
        }
        if(isset($status) && !empty($status))
        {
            $data = $data->where('status',$status); 
        }

        if(isset($page) && !empty($page))
        {
        
           $data = $data->paginate($pagination_limit);       
        }
        else
        {
            $data = $data->orderBy('id', 'DESC')
                         ->get();
           
        }
      
        $data_arr['data'] = $data;
    
        return $data_arr;


        


    }

    public function editGrowthStage(Request $request)
    {
        $growth_stage_id = $request->post('growth_stage_id');
        $data = GrowthStage::where('id', $growth_stage_id)->with('get_growth_stage')->first();
        return $data;
    
        
    }

    public function getUsedMacroListGrowthStage(Request $request)
    {
        $machine_id = Request('machine_id');
        $card_id = Request('card_id');
        $data=GrowthStage::select('macro_id')->where('machine_id',$machine_id)->where('card_id',$card_id)->get();
        return $data;
    }
}
