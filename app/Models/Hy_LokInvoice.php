<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hy_LokInvoice extends Model
{
    use HasFactory;

    protected $connection = 'hy-lok';
    protected $table = 'InvoiceList';
}
