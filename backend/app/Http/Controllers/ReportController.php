<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportController extends Controller
{
    //
    public function getReportList(Request $request)
    {

        $data_arr = array();
        $page = $request->get('page');
        $pagination_limit = 20;
        $data  = Report::orderBy('created_at', 'desc');

        if (isset($page) && !empty($page)) {

            $data = $data->paginate($pagination_limit);
        } else {
            $data = $data->get();
        }
        $data_arr['data'] = $data;
        return $data_arr;
    }


}
