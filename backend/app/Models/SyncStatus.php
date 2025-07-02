<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SyncStatus extends Model
{
    use HasFactory;
    protected $table = 'syncing_status_report';
    protected $guarded = [];

    public function get_user()
    {
        return $this->belongsTo(User::class,'login_id');
    }

}
