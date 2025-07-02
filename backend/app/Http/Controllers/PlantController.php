<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\Plants;
use App\Models\PlantStage;
use App\Models\GrowthStage;
use App\Models\GrowthStageDetails;
use App\Models\MacroDetails;
use App\Models\User;
use App\Models\CardDetails;
use App\Models\SyncStatus;
use Validator;
use DB;

class PlantController extends Controller
{
    public function createPlant(Request $request)
    {
        $arr = array();
        $config = array();
        $commandExs = array();

        $loggedUser =  Auth::User()->id;
      
        $PlantId = $request->post('plant_id');
        $machine_id =$request->post('machine_id');
        $arr['plant_name'] = $request->post('plant_name');
        $arr['machine_id'] = $request->post('machine_id');
        $arr['card_id'] = $request->post('card_id');
        $arr['macro_id'] = $request->post('macro_id');
        $arr['status'] = config('constant.ACTIVE');
        $details = array();
        $details = $request->post("growth_details");       
        $ids = array();   

       

/******************Validation********************************** */
        $rule = [
                    // 'plant_name' =>'required|unique:plant_details,plant_name,'.(!empty($PlantId) ? $PlantId : 'NULL').',id',
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
                'growth_details.'.$m.'.standard_tds' => 'required',
                'growth_details.'.$m.'.tds_range' => 'required',
                'growth_details.'.$m.'.standard_ph' => 'required',
                'growth_details.'.$m.'.ph_range' => 'required',
                'growth_details.'.$m.'.standard_quantity_of_general_solution' => 'required',
            ];

            $custom_msg = [
                'growth_details.'.$m.'.stage.required' => 'Stage is required',
                'growth_details.'.$m.'.standard_tds.required' => 'Standard tds is required',
                'growth_details.'.$m.'.tds_range.required' => 'Tds range  is required',
                'growth_details.'.$m.'.standard_ph.required' => 'Standard_ph  is required',
                'growth_details.'.$m.'.ph_range.required' => 'Ph range  is required',
                'growth_details.'.$m.'.standard_quantity_of_general_solution' => 'Standard quantity of general solution is required',
                
            ];

            $validator2 = Validator::make($request->all(),$rule2, $custom_msg);
            if ($validator2->fails())
            {
                $result_arr2= array('status'=>False,);
                $result_arr2['response'] = $validator2->errors();
                return json_encode($result_arr2);
            }  
        }

       


        if(!isset( $PlantId ) && empty( $PlantId ))
        {
           
            $arr['created_by'] = $loggedUser;
            $arr['response_status'] = 1;
            $data = Plants::create($arr);  

            $device_response_arr = [];
            $machine_id=$request->post('machine_id');
            $device_response_arr['machine_id'] = $request->post('machine_id');
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'plant_details';
            $device_response_arr['updated_data'] = $data->id;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::create($device_response_arr);          

            if(isset($data->id))
            {
                $config['plant_id'] = $data->id;
                $config['status'] = config('constant.ACTIVE');
                $config['created_by'] = $loggedUser;

                for($i=0;$i<count($details);$i++)
                {
                    $config['stage'] = $details[$i]['stage'];
                    $config['standard_tds'] = $details[$i]['standard_tds'];
                    $config['tds_range'] = $details[$i]['tds_range'];
                    $config['standard_ph'] = $details[$i]['standard_ph'];
                    $config['ph_range'] = $details[$i]['ph_range'];
                    $config['standard_quantity_of_general_solution'] = $details[$i]['standard_quantity_of_general_solution'];
                    $result = PlantStage::create( $config);  
                }
            }    
            return response()->json(["message" => "Created successfully","status"=>True]);
        }
        else{
            $config['plant_id'] = $PlantId;
            $config['status'] = config('constant.ACTIVE');
            $config['updated_by'] = $loggedUser;

            $arr['updated_by'] = $loggedUser;
            $arr['response_status'] = 1;

            $data = Plants::where('id', $PlantId)->update($arr);

            $device_response_arr = [];
            $device_response_arr['machine_id'] = $request->post('machine_id');
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['table_name'] = 'plant_details';
            $device_response_arr['updated_data'] = $PlantId;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            $sync_data = SyncStatus::where('machine_id',$machine_id)->where('table_name','plant_details')->where('updated_data', $PlantId)->where('syncing_status',1)->first();
            if(isset($sync_data))
            {
                $sync_data =  SyncStatus::where('id', $sync_data->id)->update($device_response_arr);
            }
            else
            {
                $sync_data = SyncStatus::create($device_response_arr);  
            }

            $ids = PlantStage::select('id')->where('plant_id',$PlantId)->get()->toArray();
            $del_config = array();     
            for($j=0;$j<count($ids);$j++)
            {
                $idVal = $ids[$j]['id'];
   
              
                for($i=0;$i<count($details);$i++)
                {
                   
                

                    if(isset($details[$i]['id']))
                    {
                       
                        if(isset($details[$i]['standard_tds']) && isset($details[$i]['tds_range'])  && isset($details[$i]['standard_ph']) && isset($details[$i]['ph_range'] ) && isset($details[$i]['standard_quantity_of_general_solution'] )  && isset($details[$i]['stage'] ) )
                        {
                             
                    
                            if(isset($details[$i]['id']) && !empty($details[$i]['id']))
                            {      
                                    
                                $config['stage'] = $details[$i]['stage'];
                                $config['standard_tds'] = $details[$i]['standard_tds'];
                                $config['tds_range'] = $details[$i]['tds_range'];
                                $config['standard_ph'] = $details[$i]['standard_ph'];
                                $config['ph_range'] = $details[$i]['ph_range'];
                                $config['standard_quantity_of_general_solution'] = $details[$i]['standard_quantity_of_general_solution'];
                                $config['status'] = config('constant.ACTIVE');
                                $config['updated_by'] = $loggedUser;

                                if(array_search($ids[$j]['id'], array_column($details, 'id')) !== False)
                                {
                                  
                                    //echo "Value Present in Array---ID====".$ids[$j]['id'];
                                    $result = PlantStage::where('id',$details[$i]['id'])->update($config);                            
                                }
                            
                                else{
                                   
                                    // echo "Value Not Found-----ID=====".$ids[$j]['id'];
                                    $del_config['status'] = config('constant.INACTIVE');
                                    $del_config['deleted_at'] = now();
                                    $del_config['updated_by'] = $loggedUser;

                                    $result = PlantStage::where('id',$idVal)->update( $del_config);                            
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
                    if(isset($details[$k]['standard_tds']) && isset($details[$k]['tds_range']) && isset($details[$k]['standard_ph']) && isset($details[$k]['ph_range']) && isset($details[$k]['standard_quantity_of_general_solution']) && isset($details[$k]['stage']))
                    {
                        $config['stage'] = $details[$k]['stage'];
                        $config['standard_tds'] = $details[$k]['standard_tds'];
                        $config['tds_range'] = $details[$k]['tds_range'];
                        $config['standard_ph'] = $details[$k]['standard_ph'];
                        $config['ph_range'] = $details[$k]['ph_range'];
                        $config['standard_quantity_of_general_solution'] = $details[$k]['standard_quantity_of_general_solution'];
                        $config['status'] = config('constant.ACTIVE');
                        $config['created_by'] = $loggedUser;
                        $result = PlantStage::create($config);
                    }
                 
                }                
                  
            }
            
           return response()->json(["message" => "updated successfully","status"=>True]);      
            
        }

    

    }


    public function getPlantList(Request $request)
    {
        $page = $request->get('page');
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        $search_keyword = $request->post('search_keyword');
        $status = $request->post('status');
    
        $data = array();

       
        $data = Plants::orderBy('created_at','DESC');

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

    public function editPlant(Request $request)
    {
        $plant_id = $request->post('plant_id');
        $data = Plants::where('id', $plant_id)->with('get_growth_setting')->first();
        return $data;
    
        
    }


    public function getMachineList(Request $request)
    {
        $role_id = Auth::User()->role_id;
        $user_id = Auth::User()->id;  
        if($role_id==config('constant.ROLES.USER')){

            $data=User::select('machine_id')->where('id',$user_id)->where('status', config('constant.ACTIVE'))->get();
        }
        else
        {

            $data = User::select('machine_id')->whereNotNull('machine_id')->get();
        }
        
        return $data;
    }


    public function destroy(Request $request)
    {
        $loggedUser =  Auth::User()->id;
        $plant_id = Request('plant_id');
        $status = Request('status');
        if (isset($plant_id) && !empty($plant_id) && isset($status) && !empty($status)) {
            $upd_arr = array('status' => $status,'response_status'=>1, 'deleted_at' => now());
            if ($status == config('constant.ACTIVE')) {

                $msg = 'Activation';
            } else {
                $msg = 'Deactivation';
            }
            $data = Plants::where('id', $plant_id)->update($upd_arr);
            $growth=GrowthStage::where('plant_id',$plant_id)->update($upd_arr);
            $macro=MacroDetails::where('plant_id',$plant_id)->update($upd_arr);

            $machineId=Plants::select('*')->where('id',$plant_id)->first();
            $data_growth=GrowthStage::select('*')->where('plant_id',$plant_id)->first();
            $data_macro=MacroDetails::select('*')->where('plant_id',$plant_id)->first();

            $device_response_arr = [];
            $device_response_arr['machine_id'] = $machineId->machine_id;
            $device_response_arr['login_id'] = $loggedUser;;
            $device_response_arr['updated_date'] = 0;
            $device_response_arr['updated_time'] = 0;
            $device_response_arr['syncing_status'] = 1;
            $device_response_arr['last_updated_time'] = 0;
            if (isset($data) && !empty($data)) 
            {
                $device_response_arr['table_name'] = 'plant_details';
                $device_response_arr['updated_data'] = $plant_id;
                $sync_data = SyncStatus::where('machine_id',$machineId->machine_id)->where('table_name','plant_details')->where('updated_data', $plant_id)->where('syncing_status',1)->first();
                if(isset($sync_data))
                {
                    $sync_data =  SyncStatus::where('id', $sync_data->id)->update($device_response_arr);
                }
                else
                {
                    $sync_data = SyncStatus::create($device_response_arr);  
                }
            }
            if (isset($growth) && !empty($growth)) 
            {
                $device_response_arr['table_name'] = 'growth_stage';
                $device_response_arr['updated_data'] = $data_growth->id;
                $sync_data = SyncStatus::where('machine_id',$machineId->machine_id)->where('table_name','growth_stage')->where('updated_data',$data_growth->id)->where('syncing_status',1)->first();
                if(isset($sync_data))
                {
                    $sync_data =  SyncStatus::where('id', $sync_data->id)->update($device_response_arr);
                }
                else
                {
                    $sync_data = SyncStatus::create($device_response_arr);  
                }
            }
            if (isset($macro) && !empty($macro)) 
            {
                $device_response_arr['table_name'] = 'macro_details';
                $device_response_arr['updated_data'] = $data_macro->id;
                $sync_data = SyncStatus::where('machine_id',$machineId->machine_id)->where('table_name','macro_details')->where('updated_data', $data_macro->id)->where('syncing_status',1)->first();
                if(isset($sync_data))
                {
                    $sync_data =  SyncStatus::where('id', $sync_data->id)->update($device_response_arr);
                }
                else
                {
                    $sync_data = SyncStatus::create($device_response_arr);  
                }
            }

            if (isset($data) && !empty($data)) {
                $result_arr = array('status' => True, 'message' => $msg . ' Success');
            } else {
                $result_arr = array('status' => False, 'message' => $msg . ' Failure');
            }
        } else {
            $result_arr = array('status' => False, 'message' => 'Inputs Required');
        }
        return json_encode($result_arr);
    }

    public function getCardList(Request $request)
    {
        $machine_id = Request('machine_id');
        $data=CardDetails::select('card_id')->where('machine_id',$machine_id)->get();
        return $data;
    }

    public function getMacroList(Request $request)
    {
        $machine_id = Request('machine_id');
        $card_id = Request('card_id');
        $data=Plants::select('macro_id')->where('machine_id',$machine_id)->where('card_id',$card_id)->get();
        return $data;
    }

    public function getPlantName(Request $request)
    {
        $machine_id = Request('machine_id');
        $card_id = Request('card_id');
        $macro_id = Request('macro_id');

        $data=Plants::select('id')->where('machine_id',$machine_id)->where('card_id',$card_id)->where('macro_id',$macro_id)->first();
        return $data;
    }

}
