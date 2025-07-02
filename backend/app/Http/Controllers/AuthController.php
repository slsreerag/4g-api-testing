<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Auth;  
use App\Models\User;
use App\Helpers;
use Validator;
use DB;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public $successStatus = 200;

    public function login(){
      
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;

            // $permissions=Helpers::get_permsission_names();
            return response()->json(['success' => $success,'role_id'=>$user->role_id], $this->successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }
}
