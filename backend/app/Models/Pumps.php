<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pumps extends Model
{
    use HasFactory;
    protected $table = '32io_pump_setting';
    protected $guarded = [];
}
