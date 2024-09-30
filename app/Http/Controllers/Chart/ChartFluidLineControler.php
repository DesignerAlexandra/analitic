<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Chart\ChartController;
use App\Models\Direct;
use App\Models\FluidLineInvoice;
use App\Models\FluidLinePhone;
use App\Models\SateliPhone;
use Illuminate\Http\Request;

class ChartFluidLineControler extends ChartController
{
    protected $title = 'fluidLine';

    public function __construct()
    {
        parent::__construct(
            new FluidLineInvoice(),
            new FluidLinePhone(),
            new SateliPhone(),
            new Direct(),
            env('AUTH_TOKEN_METRIC_FLUIDLINE'),
            env('COUNTER_ID_METRIC_FLUIDLINE')
        );
    }
}
