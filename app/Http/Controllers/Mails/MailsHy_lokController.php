<?php

namespace App\Http\Controllers\Mails;

use App\Models\Direct;
use App\Models\Hy_LokInvoice;
use App\Models\Hy_LokVisitor;
use Illuminate\Http\Request;

class MailsHy_lokController extends MailsController
{
    protected string $title = 'hy-lok';

    public function __construct()
    {
        parent::__construct(
            new Hy_LokInvoice(),
            new Hy_LokVisitor(),
            env('AUTH_TOKEN_METRIC_SWAGELO_HY_LOK'),
            env('COUNTER_ID_METRIC_HY_LOK'),
            new Direct()
        );
    }
}
