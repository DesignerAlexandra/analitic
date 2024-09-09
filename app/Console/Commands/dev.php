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
      
        $data1C = Hy_LokInvoice::select('client_id', 'invoice_id', 'invoice_status', 'invoice_date', 'invoice_price', 'client_code', 'client_mail')->where('client_mail', 'kdshilkin@pharmstd.ru')->distinct()->get()->toArray();
     
        $ym_uid = Hy_LokVisitor::select('_ym_uid')->where('client_id', $data1C[0]['client_id'])->limit(1)->get()->toArray();

        dd($ym_uid);

    }
}
