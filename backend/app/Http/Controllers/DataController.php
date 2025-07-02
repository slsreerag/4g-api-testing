<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;  
use App\Models\DeviceReports; 
use App\Models\DeviceLatestData; 
use App\Models\Pumps;
use Validator;
use DB;

class DataController extends Controller
{
    public function getDeviceData(Request $request)
    
    {
        $data = DeviceLatestData::orderBy('created_at', 'desc')->where('status',2)->get();
        foreach ($data as $datas)
        {     
            DeviceLatestData::where('device_id', $datas->device_id)->update(['status'=>1]);
        }
        return $data;
    }


    public function getDataResponse(Request $request)
    
    {
        $deviceId = $request->get('device_id');
        $P1 = $request->get('P1');
        $P12 = $request->get('P12');
        $P13 = $request->get('P13');
        $P14 = $request->get('P14');
        $P15 = $request->get('P15');
        $P16 = $request->get('P16');
        $P17 = $request->get('P17');
        $P18 = $request->get('P18');
        $P19 = $request->get('P19');
        $P21 = $request->get('P21');
        $P22 = $request->get('P22');
        $P23 = $request->get('P23');
        $P24 = $request->get('P24');

        $DataRes = Pumps::where('device_id', $deviceId)->first();

        if(!isset($DataRes) && empty($DataRes))
        {  
            return response()->json(["message" => "Device not registered","status"=>True]); 
        }
        else{
           if(isset( $deviceId ) && !empty( $deviceId ))
           {
                if(isset( $P1 ) && !empty( $P1 ))
                {
                
                    $result = Pumps::where('device_id',$deviceId)->update(['P1'=>$P1]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P12 ) && !empty( $P12 ))
                {
                
                    $result = Pumps::where('device_id',$deviceId)->update(['P12'=>$P12]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P13 ) && !empty( $P13 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P13'=>$P13]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P14 ) && !empty( $P14 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P14'=>$P14]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P15 ) && !empty( $P15 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P15'=>$P15]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P16 ) && !empty( $P16 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P16'=>$P16]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P17 ) && !empty( $P17 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P17'=>$P17]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P18 ) && !empty( $P18 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P18'=>$P18]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P19 ) && !empty( $P19 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P19'=>$P19]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P21 ) && !empty( $P21 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P21'=>$P21]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P22 ) && !empty( $P22 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P22'=>$P22]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P23 ) && !empty( $P23 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P23'=>$P23]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }
                if(isset( $P24 ) && !empty( $P24 ))
                {
                    $result = Pumps::where('device_id',$deviceId)->update(['P24'=>$P24]); 
                    return response()->json(["message" => "Success","status"=>True]);
                }

            }  
        }  
        
    }

    // public function hourlyDeviceData(){
    //     $deviceLatestData = DeviceLatestData::orderBy('created_at', 'desc')
    //     ->where(function ($query) {
    //         $query->where('P1', '<', 220)
    //               ->orWhere('P1', '>', 255);
    //     })
    //     ->where(function ($query) {
    //         $query->where('P2', '<', 220)
    //               ->orWhere('P2', '>', 255);
    //     })
    //     ->where(function ($query) {
    //         $query->where('P3', '<', 220)
    //               ->orWhere('P3', '>', 255);
    //     })
    //     ->get();
    //     return $deviceLatestData;
    // }
    public function hourlyDeviceData(){
        $deviceLatestData = DeviceLatestData::orderBy('created_at', 'desc')->get();

        return $deviceLatestData;
    }
}
