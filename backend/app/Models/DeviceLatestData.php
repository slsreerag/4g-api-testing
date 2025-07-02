<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeviceLatestData extends Model
{
    use HasFactory;
    protected $table = '32io_device_latest_data';
    protected $guarded = [];
}
