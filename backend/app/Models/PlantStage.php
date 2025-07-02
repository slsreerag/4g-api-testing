<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantStage extends Model
{
    use HasFactory;
    protected $table = 'plants_stage';
    protected $guarded = [];
}
