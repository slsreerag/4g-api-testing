<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DrainingReport extends Model
{
    use HasFactory;
    protected $table = 'draining_reports';
    protected $guarded = [];
}
