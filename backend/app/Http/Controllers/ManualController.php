<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Pumps;
use App\Models\Devices;
use App\Models\DeviceReports;
use App\Models\DeviceLatestData;
use Validator;
use DB;

class ManualController extends Controller
{
    public function getPumpList(Request $request)
    {

        $data_arr = array();
        $data  = Pumps::orderBy('created_at', 'desc');
        $data = $data->get();
        $data_arr = $data;
        return $data_arr;
    }


    public function updatestatus_control(Request $request){
        $device_id = $request->post('device_id');
        $pump_id = $request->post('pump_id');
        $switchOnOffVal =  $request->post('switchonoff');
        $status = "Open";
        $getMotorData = Pumps::where('device_id', $device_id)
                    ->where('pump_id', $pump_id)
                    ->first();

        if($getMotorData){
                $id_motor =Pumps::where('device_id', $device_id)
                                  ->where('pump_id', $pump_id)
                                  ->update(['switchonoff'=>$switchOnOffVal, 'status'=>$status]);
                return response()->json(["message" => "Updated successfully","status"=>True]);
        }
        else{
                // $insertChild = DB::table('tbl_system')
                // ->insertGetId(['switchonoff'=>$switchOnOffVal,'status'=>$status,'motor_type'=>$type,'system_id'=>$device_number]);
             }

        }


        public function getstatus_control(Request $request){
            $device_number =  $request->device_id;
            $data = Pumps::select('device_id','P1','P2','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20','P21','P22','P23','P24')->where('device_id', $device_number)->first();
            return("device_id:"."".$data->device_id.","."P1:"."".$data->P1.","."P2:"."".$data->P2.","."P3:"."".$data->P3.","."P4:"."".$data->P4.","."P5:"."".$data->P5.","."P6:"."".$data->P6.","."P7:"."".$data->P7.","."P8:"."".$data->P8.","."P9:"."".$data->P9.","."P10:"."".$data->P10.","."P11:"."".$data->P11.","."P12:"."".$data->P12.","."P13:"."".$data->P13.","."P14:"."".$data->P14.","."P15:"."".$data->P15.","."P16:"."".$data->P16.","."P17:"."".$data->P17.","."P18:"."".$data->P18.","."P19:"."".$data->P19.","."P20:"."".$data->P20.","."P21:"."".$data->P21.","."P22:"."".$data->P22.","."P23:"."".$data->P23.","."P24:"."".$data->P24);
        }



    public function getReport(Request $request)
    {
        $deviceId = $request->get('device_id');
        $data  = DeviceReports::where('device_id',$deviceId)->orderBy('created_at', 'desc')->first();
        return $data;
    }

    public function getAllReport(Request $request)
    {
        $start_date = $request->input('startDate');
        $end_date = $request->input('endDate');
        $page = $request->input('page');
        $device = $request->input('selectedDevice');
        $pagination_limit = 50;

        $query = DeviceReports::orderBy('created_at', 'desc');

        if ($start_date && $end_date) {
            $query->whereBetween('created_at', [$start_date, $end_date]);
        }
        if ($device) {
            $query->where('device_id', $device);
        }

        if ($page) {
            $data = $query->Paginate($pagination_limit);
        } else {
            $data = $query->get();
        }

        return ['data' => $data];
    }

    public function getAllDevices() {

            $distinctDevices = DeviceReports::select('device_id')->distinct()->get();

            return response()->json($distinctDevices);

    }



    public function insertData(Request $request){
        $deviceId = $request->get('device_id');
        $P1 = $request->get('p1');
        $P2 = $request->get('p2');
        $P3 = $request->get('p3');
        $P4 = $request->get('p4');
        $P5 = $request->get('p5');
        $P6 = $request->get('p6');
        $P7 = $request->get('p7');
        $P8 = $request->get('p8');
        $P9 = $request->get('p9');
        $P10 = $request->get('p10');
        $P11 = $request->get('p11');
        $P12 = $request->get('p12');
        $P13 = $request->get('p13');
        $P14 = $request->get('p14');
        $P15 = $request->get('p15');
        $P16 = $request->get('p16');
        $P17 = $request->get('p17');
        $P18 = $request->get('p18');
        $P19 = $request->get('p19');
        $P20 = $request->get('p20');
        $P21 = $request->get('p21');
        $P22 = $request->get('p22');
        $P23 = $request->get('p23');
        $P24 = $request->get('p24');
        $P25 = $request->get('p25');
        $P26 = $request->get('p26');
        $P27 = $request->get('p27');
        $P28 = $request->get('p28');
        $P29 = $request->get('p29');
        $P30 = $request->get('p30');
        $P31 = $request->get('p31');
        $P32 = $request->get('p32');
        $P33 = $request->get('p33');
        $P34 = $request->get('p34');
        $P35 = $request->get('p35');
        $P36 = $request->get('p36');
        $P37 = $request->get('p37');
        $P38 = $request->get('p38');
        $P39 = $request->get('p39');
        $P40 = $request->get('p40');
        $P41 = $request->get('p41');
        $P42 = $request->get('p42');
        $P43 = $request->get('p43');
        $P44 = $request->get('p44');
        $P45 = $request->get('p45');
        $P46 = $request->get('p46');
        $P47 = $request->get('p47');
        $P48 = $request->get('p48');
        $P49 = $request->get('p49');


        $device_response_arr = [];
        $device_response_arr['device_id'] = $deviceId;
        $device_response_arr['P1'] = $P1;
        $device_response_arr['P2'] = $P2;
        $device_response_arr['P3'] = $P3;
        $device_response_arr['P4'] = $P4;
        $device_response_arr['P5'] = $P5;
        $device_response_arr['P6'] = $P6;
        $device_response_arr['P7'] = $P7;
        $device_response_arr['P8'] = $P8;
        $device_response_arr['P9'] = $P9;
        $device_response_arr['P10'] = $P10;
        $device_response_arr['P11'] = $P11;
        $device_response_arr['P12'] = $P12;
        $device_response_arr['P13'] = $P13;
        $device_response_arr['P14'] = $P14;
        $device_response_arr['P15'] = $P15;
        $device_response_arr['P16'] = $P16;
        $device_response_arr['P17'] = $P17;
        $device_response_arr['P18'] = $P18;
        $device_response_arr['P19'] = $P19;
        $device_response_arr['P20'] = $P20;
        $device_response_arr['P21'] = $P21;
        $device_response_arr['P22'] = $P22;
        $device_response_arr['P23'] = $P23;
        $device_response_arr['P24'] = $P24;
        $device_response_arr['P25'] = $P25;
        $device_response_arr['P26'] = $P26;
        $device_response_arr['P27'] = $P27;
        $device_response_arr['P28'] = $P28;
        $device_response_arr['P29'] = $P29;
        $device_response_arr['P30'] = $P30;
        $device_response_arr['P31'] = $P31;
        $device_response_arr['P32'] = $P32;
        $device_response_arr['P33'] = $P33;
        $device_response_arr['P34'] = $P34;
        $device_response_arr['P35'] = $P35;
        $device_response_arr['P36'] = $P36;
        $device_response_arr['P37'] = $P37;
        $device_response_arr['P38'] = $P38;
        $device_response_arr['P39'] = $P39;
        $device_response_arr['P40'] = $P40;
        $device_response_arr['P41'] = $P41;
        $device_response_arr['P42'] = $P42;
        $device_response_arr['P43'] = $P43;
        $device_response_arr['P44'] = $P44;
        $device_response_arr['P45'] = $P45;
        $device_response_arr['P46'] = $P46;
        $device_response_arr['P47'] = $P47;
        $device_response_arr['P48'] = $P48;
        $device_response_arr['P49'] = $P49;
        DeviceReports::create($device_response_arr);

        $DataRes = DeviceLatestData::where('device_id', $deviceId)->first();

        if(isset($DataRes)==1)
        {
            if($DataRes->P7==$P7 && $DataRes->P8==$P8 && $DataRes->P9==$P9 && $DataRes->P10==$P10 && $DataRes->P11==$P11  && $DataRes->P12==$P12 && $DataRes->P13==$P13  && $DataRes->P14==$P14
            && $DataRes->P15==$P15  && $DataRes->P16==$P16 && $DataRes->P17==$P17 && $DataRes->P18==$P18 && $DataRes->P19==$P19 && $DataRes->P29==$P29 && $DataRes->P30==$P30 && $DataRes->P31==$P31
            && $DataRes->P32==$P32 && $DataRes->P33==$P33 && $DataRes->P34==$P34 && $DataRes->P35==$P35 && $DataRes->P36==$P36 && $DataRes->P37==$P37 && $DataRes->P38==$P38 && $DataRes->P39==$P39 && $DataRes->P40==$P40
            // && $DataRes->P25==$P25 && $DataRes->P26==$P2 && $DataRes->P27==$P27 && $DataRes->P28==$P28 && $DataRes->P29==$P29 && $DataRes->P30==$P30 && $DataRes->P31==$P31 && $DataRes->P32==$P32
            // && $DataRes->P33==$P33 && $DataRes->P34==$P34 && $DataRes->P35==$P35 && $DataRes->P36==$P36 && $DataRes->P37==$P37 && $DataRes->P38==$P38 && $DataRes->P3==$P39 && $DataRes->P40==$P40
            // && $DataRes->P41==$P41 && $DataRes->P42==$P42 && $DataRes->P43==$P43 && $DataRes->P44==$P44 && $DataRes->P45==$P45 && $DataRes->P46==$P46 && $DataRes->P48==$P48 && $DataRes->P49==$P49
            )
            {
                $device_response_arr['status'] = 1;
            }
            else{
                $device_response_arr['status'] = 2;
            }
            DeviceLatestData::where('id',$DataRes->id)->update($device_response_arr);
        }
        else{
            $device_response_arr['status'] = 2;
            DeviceLatestData::create($device_response_arr);
        }



        return response()->json(["status"=>True]);

}

public function getDeviceList(Request $request)
{
    // $role_id = Auth::User()->role_id;
    // $user_id = Auth::User()->id;
    $data = Devices::select('device_id')->get();


    return $data;
}

public function relay_create(Request $request)
{
    $loggedUser =  Auth::id();
    $device_id = $request->post('device_id');
    $P1 = $request->post('P1');
    $P3 = $request->post('P3');
    $P4 = $request->post('P4');
    $P5 = $request->post('P5');
    $P6 = $request->post('P6');
    $P7 = $request->post('P7');
    $P8 = $request->post('P8');
    $P9 = $request->post('P9');
    $P10 = $request->post('P10');
    $P11 = $request->post('P11');
    $P12 = $request->post('P12');
    $P13 = $request->post('P13');
    $P14 = $request->post('P14');
    $P15 = $request->post('P15');
    $P16 = $request->post('P16');
    $P17 = $request->post('P17');
    $P18 = $request->post('P18');
    $P19 = $request->post('P19');
    $P20 = $request->post('P20');
    $P21 = $request->post('P21');
    $P22 = $request->post('P22');
    $P23 = $request->post('P23');
    $P24 = $request->post('P24');

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



    $device_arr = array();
    $device_arr['device_id'] = $device_id;
    $device_arr['P1'] = $P1;
    $device_arr['P2'] = now();
    $device_arr['P3'] = $P3;
    $device_arr['P4'] = $P4;
    $device_arr['P5'] = $P5;
    $device_arr['P6'] = $P6;
    $device_arr['P7'] = $P7;
    $device_arr['P8'] = $P8;
    $device_arr['P9'] = $P9;
    $device_arr['P10'] = $P10;
    $device_arr['P11'] = $P11;
    $device_arr['P12'] = $P12;
    $device_arr['P13'] = $P13;
    $device_arr['P14'] = $P14;
    $device_arr['P15'] = $P15;
    $device_arr['P16'] = $P16;
    $device_arr['P17'] = $P17;
    $device_arr['P18'] = $P18;
    $device_arr['P19'] = $P19;
    $device_arr['P20'] = $P20;
    $device_arr['P21'] = $P21;
    $device_arr['P22'] = $P22;
    $device_arr['P23'] = $P23;
    $device_arr['P24'] = $P24;
    $device_arr['status'] = config('constant.ACTIVE');

    $DataRes = Pumps::where('device_id', $device_id)->first();

    if(!isset($DataRes) && empty($DataRes))
    {

        // $device_arr['created_by'] = $loggedUser;
        $modalData = Pumps::create($device_arr);
        return response()->json(["message" => "Created successfully","status"=>True]);
    }
    else{
        // $device_arr['updated_by'] = $loggedUser;
        $result = Pumps::where('id',$DataRes->id)->update($device_arr);
        return response()->json(["message" => "Updated successfully","status"=>True]);
    }

}


public function edit_relay(Request $request)
{
    $device_id = Request('device_id');
    $data = Pumps::where('device_id', $device_id)->first();
    return $data;
}



public function get_relay_status(Request $request)
{
    $device_id = Request('device_id');
    $data = DeviceReports::select('P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19')->where('device_id', $device_id)->orderBy('created_at', 'desc')->first();
    return $data;
}









}
