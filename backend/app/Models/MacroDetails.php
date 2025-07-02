<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MacroDetails extends Model
{
    use HasFactory;
    protected $table = 'macro_details';
    protected $guarded = [];

    public function get_plant()
    {
        return $this->belongsTo(Plants::class,'plant_id');
    }
}
