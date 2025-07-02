<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plants extends Model
{
    use HasFactory;
    protected $table = 'plant_details';
    protected $guarded = [];

    public function get_growth_setting()
    {
        return $this->hasMany(PlantStage::class, 'plant_id')->where('status', config('constant.ACTIVE'));
    }
}
