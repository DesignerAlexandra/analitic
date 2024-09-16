<?php

namespace App\Http\Controllers\Mails;

use App\Models\Direct;
use App\Models\FluidLineInvoice;
use App\Models\Hy_LokVisitor;
use Illuminate\Http\Request;

class MailsFluidLineController extends MailsController
{
    protected string $title = 'fluidLine';

    public function __construct()
    {
        parent::__construct(
            new FluidLineInvoice(),
            new Hy_LokVisitor(),
            env('AUTH_TOKEN_METRIC_SWAGELO_HY_LOK'),
            env('COUNTER_ID_METRIC_HY_LOK'),
            new Direct()
        );
    }
}
