<?php

namespace App\Console\Commands;

use App\Http\Controllers\Compaigns\CompaignsWikaController;
use App\Models\Direct;
use App\Models\DirectHylok;
use App\Models\DirectSwagelo;
use App\Models\DirectWika;
use App\Models\Hy_LokInvoice;
use App\Models\Hy_LokVisitor;
use App\Models\HylokInvoice;
use App\Models\HylokVisitor;
use App\Models\UpdateDirect;
use App\Services\APIHook\Yandex;
use Illuminate\Console\Command;
use ReflectionClass;

class dev extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dev';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
      
        $yandex = new Yandex(env('AUTH_TOKEN_METRIC_SWAGELO_HY_LOK'), env('COUNTER_ID_METRIC_SWAGELO'));

        try {

            $dataMetric = $yandex->metricById('');

        } catch (\Throwable $th) {
            dd('yes');
        }
        

        dd($dataMetric);

    }
}
