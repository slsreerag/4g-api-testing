<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DosingSetting extends Model
{
    use HasFactory;
    protected $table = 'dosing_time_settings';
    protected $guarded = [];
}
