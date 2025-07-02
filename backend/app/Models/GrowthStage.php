<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrowthStage extends Model
{
    use HasFactory;
    protected $table = 'growth_stage';
    protected $guarded = [];

    public function get_growth_stage()
    {
        return $this->hasMany(GrowthStageDetails::class, 'growth_stage_id')->where('status', config('constant.ACTIVE'));
    }


    public function get_plant()
    {
        return $this->belongsTo(Plants::class,'plant_id');
    }
}
