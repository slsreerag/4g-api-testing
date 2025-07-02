<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlowAlert extends Model
{
    use HasFactory;
    protected $table = 'flow_alert';
    protected $guarded = [];
}
