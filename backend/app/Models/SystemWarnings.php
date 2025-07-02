<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemWarnings extends Model
{
    use HasFactory;
    protected $table = 'system_warnings';
    protected $guarded = [];
}
