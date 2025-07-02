<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FloodingReport extends Model
{
    use HasFactory;
    protected $table = 'flooding_reports';
    protected $guarded = [];
}
