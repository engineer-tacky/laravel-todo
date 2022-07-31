<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    //1対多のリレーション追加
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
