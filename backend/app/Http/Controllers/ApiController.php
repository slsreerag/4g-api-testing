<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;
use Illuminate\Support\Carbon;
use Auth; 

class ApiController extends Controller
{

    //
    public $successStatus = 200;


    public function get_data(Request $request)
    {
        try {

            $deviceId = $request->get('device_id');
            $count = $request->get('count');


            $DataRes = Report::where('device_id', $deviceId)->latest('created_at')->first();
        
    
            if (isset($DataRes)==1) {

                $device_response_arr = [];
                $device_response_arr['device_id'] = $deviceId;
                $device_response_arr['count'] = $count;
                $device_response_arr['created_at'] = now();
                $device_response_arr['updated_at'] = now();
                $created_at_previous=$DataRes->created_at;
                $duration=$device_response_arr['created_at']->diff($created_at_previous,2)->format('%D days - %H hrs:%I min:%S sec');
                $device_response_arr['time_since_last_update'] =$duration;
                Report::create($device_response_arr);
                $add='"';
                echo( $add.$device_response_arr['created_at'].$add);
            } else {
                $device_response_arr = [];
                $device_response_arr['device_id'] = $deviceId;
                $device_response_arr['count'] = $count;
                $device_response_arr['created_at'] = now();
                $device_response_arr['updated_at'] = now();
                $duration=$device_response_arr['created_at']->diff(now())->format('%D days - %H hrs:%I min');
                $device_response_arr['time_since_last_update'] =$duration;
                Report::create($device_response_arr);
                $add='"';
                echo( $add.$device_response_arr['created_at'].$add);
            }
        } catch (\Illuminate\Database\QueryException $ex) {
            $error      = $ex->getMessage();
            $data       = array('status' => 'DB_ERROR');
            return $data;
        }
    }
}
