<?php

namespace App\Http\Controllers\Chart;

use App\Http\Controllers\Controller;
use App\Models\UpdateDirect;
use App\Services\APIHook\Yandex;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Inertia\Inertia;

abstract class ChartController extends Controller
{
    protected UpdateDirect $updateDirect;
    protected int $directID;
    protected Model $modelInvoice;
    protected Model $modelPhone;
    protected Model $sateliPhone;
    protected Yandex $yandex;
    protected $direct;
    protected $title;

    public function __construct(
        $modelInvoice,
        $modelPhone,
        $sateliPhone,
        $direct,
        $metricaToken,
        $metricaCounter,
    )
    {
        $this->modelInvoice = $modelInvoice;
        $this->modelPhone = $modelPhone;
        $this->sateliPhone = $sateliPhone;
        $this->direct = $direct;
        $this->yandex = new Yandex($metricaToken, $metricaCounter);
        $this->updateDirect = new UpdateDirect();
    }

    public function index()
    {
        $dateUpdateDirect = $this->updateDirect::select(['date_check_update'])->limit(1)->get()->toArray()[0]['date_check_update'];

        $dataInvoice = $this->modelInvoice::select('invoice_date', 'invoice_status', 'client_mail', 'invoice_price')->distinct()->get();

        $sateliPhone = $this->sateliPhone::select('client_phone', 'invoice_status', 'invoice_price', 'invoice_date')->get();

        $mailPrice = $this->modelInvoice::select('invoice_price')->where('invoice_status', 2)->distinct()->get()->sum('invoice_price');
 
        $haystack = [];
        foreach ($sateliPhone as $key => $value) {
            $haystack[$key] = $value['client_phone'];
        }

        $wikaPhoneBy1C = $this->modelPhone::select('contact_phone_number')->distinct()->get();

        $wikaPhone = [];
        foreach ($wikaPhoneBy1C as $value) {
            $phone = $value['contact_phone_number'];
            $subPhone = mb_substr($phone, 1, strlen($phone) - 1);
            $key = array_search($subPhone, $haystack);

            if(!empty($key) && !empty($sateliPhone[$key])) {
                $wikaPhone[] = $sateliPhone[$key];
            }
        }

        $entryPoints = [];

        $chartMail = [];

        foreach ($dataInvoice as $key => $value) {
            $dataInvoice[$key]['invoice_date'] = date('Y-m-d', strtotime($value['invoice_date']));
            if(!isset($chartMail[$value['invoice_date']])) {
                $entryPoints[] = date('Y-m-d', strtotime($value['invoice_date']));
                $chartMail[$value['invoice_date']] = 1;
            } else {
                $chartMail[$value['invoice_date']]++;
            }
        }

        $sumPriceForCalls = 0.00;
        $chartPhone = [];
        $countPhone = 0;

        foreach ($wikaPhone as $key => $value) {
            $countPhone++;
            $wikaPhone[$key]['invoice_date'] = date('Y-m-d', strtotime($value['invoice_date']));
            if(!isset($chartPhone[$value['invoice_date']])) {
                $entryPoints[] = date('Y-m-d', strtotime($value['invoice_date']));
                $chartPhone[$value['invoice_date']] = 1;
            } else {
                $chartPhone[$value['invoice_date']]++;
            }
            if($value['invoice_status'] == 2) {
                $sumPriceForCalls += $value['invoice_price'];
            }
        }

        $entryPoints = array_unique($entryPoints);

        usort($entryPoints, function($a, $b) {
            $dateA = strtotime($a);
            $dateB = strtotime($b);

            if ($dateA == $dateB) {
                return 0;
            } elseif ($dateA > $dateB) {
                return 1;
            } else {
                return -1;
            }
        });

        $minDate = min($entryPoints);

        $maxDate = max($entryPoints);

        $fullEntryPoints = $this->prepareDataEntryPoints($minDate, $maxDate);

        $newChartMail = [];
        $newChartPhone = [];

        foreach ($fullEntryPoints as $point) {
            if(isset($chartMail[$point])) {
                $newChartMail[$point] = $chartMail[$point];
            } else {
                $newChartMail[$point] = 0;
            }
            if(isset($chartPhone[$point])) {
                $newChartPhone[$point] = $chartPhone[$point];
            } else {
                $newChartPhone[$point] = 0;
            }
        }

        return Inertia::render('ChartPage', [
            'title' => $this->title,
            'entryPoints' => $fullEntryPoints,
            'chartMail' => $newChartMail,
            'chartPhone' => $newChartPhone,
            'generalData' => [
                'countMails' => $dataInvoice->count(),
                'countCalls' => $countPhone,
                'sumPriceForCalls' => number_format($sumPriceForCalls, 2, '.', ''),
                'sumPriceForMails' => number_format($mailPrice, 2, '.', ''),
            ],
            'dateUpdateDirect' => $dateUpdateDirect,
        ]);
    }

    public function dataByDate(Request $request)
    {
        $validated = $request->validate([
            'dateFrom' => 'required|date',
            'dateTo' => 'required|date'
        ]);

        $dateFrom = date('Y-m-d', strtotime($validated['dateFrom']));
        $dateTo = date('Y-m-d', strtotime($validated['dateTo']));
        $entryPoints = [];

        $dataInvoice = $this->modelInvoice::select('invoice_date', 'invoice_status', 'client_mail', 'invoice_price')
        ->where([
            ['invoice_date', '>=', "$dateFrom 00:00:00"],
            ['invoice_date', '<=', "$dateTo 23:59:59"]
        ])->distinct()->get();

        $sateliPhone = $this->sateliPhone::select('client_phone', 'invoice_status', 'invoice_price', 'invoice_date')->get();

        $haystack = [];
        foreach ($sateliPhone as $key => $value) {
            $haystack[$key] = $value['client_phone'];
        }

        $wikaPhoneBy1C = $this->modelPhone::select('contact_phone_number')->distinct()->get();

        $wikaPhone = [];
        foreach ($wikaPhoneBy1C as $value) {
            $phone = $value['contact_phone_number'];
            $subPhone = mb_substr($phone, 1, strlen($phone) - 1);
            $key = array_search($subPhone, $haystack);

            if(!empty($key) && !empty($sateliPhone[$key])) {
                $wikaPhone[] = $sateliPhone[$key];
            }
        }

        $sumPriceForMails = 0.00;
        $chartInvoice = [];
        foreach ($dataInvoice as $key => $dateInvoice) {
            $entryPoints[] = date('Y-m-d', strtotime($dateInvoice['invoice_date']));
            if(array_key_exists(date('Y-m-d', strtotime($dateInvoice['invoice_date'])), $chartInvoice)) {
                $chartInvoice[date('Y-m-d', strtotime($dateInvoice['invoice_date']))]++;
            } else {
                $chartInvoice[date('Y-m-d', strtotime($dateInvoice['invoice_date']))] = 1;
            }
            if($dateInvoice['invoice_status'] == 2) {
                $sumPriceForMails += $dataInvoice[$key]['invoice_price'];
            }
        }

        $sumPriceForCalls = 0.00;
        $countPhone = 0;
        $chartPhone = [];
        foreach ($wikaPhone as $value) {
            if(strtotime("$dateFrom 00:00:00") <= strtotime($value['invoice_date']) && strtotime("$dateTo 23:59:59") >= strtotime($value['invoice_date'])) {
                $countPhone++;
                $entryPoints[] = date('Y-m-d', strtotime($value['invoice_date']));
                if(array_key_exists(date('Y-m-d', strtotime($value['invoice_date'])), $chartPhone)) {
                    $chartPhone[date('Y-m-d', strtotime($value['invoice_date']))]++;
                } else {
                    $chartPhone[date('Y-m-d', strtotime($value['invoice_date']))] = 1;
                }
                if($value['invoice_status'] == 2) {
                    $sumPriceForCalls += $value['invoice_price'];
                }
            }
        }

        $entryPoints = array_unique($entryPoints);

        usort($entryPoints, function($a, $b) {
            $dateA = strtotime($a);
            $dateB = strtotime($b);

            if ($dateA == $dateB) {
                return 0;
            } elseif ($dateA > $dateB) {
                return 1;
            } else {
                return -1;
            }
        });

        $fullEntryPoints = $this->prepareDataEntryPoints($dateFrom, $dateTo);

        $newChartPhone = [];
        $newChartInvoice = [];
        foreach ($fullEntryPoints as $point) {
            if(isset($chartInvoice[$point])) {
                $newChartInvoice[$point] = $chartInvoice[$point];
            } else {
                $newChartInvoice[$point] = 0;
            }
            if(isset($chartPhone[$point])) {
                $newChartPhone[$point] = $chartPhone[$point];
            } else {
                $newChartPhone[$point] = 0;
            }
        }


        return [
                'entryPoints' => $fullEntryPoints,
                'chartPhone' => $newChartPhone,
                'chartInvoice' => $newChartInvoice,
                'countMails' => $dataInvoice->count(),
                'countCalls' => $countPhone,
                'sumPriceForCalls' => number_format($sumPriceForCalls, 2, '.', ''),
                'sumPriceForMails' => number_format($sumPriceForMails, 2, '.', '')
            ];
    }

    public function getDataByDateCastomMetric(Request $request)
    {
        $validated = $request->validate([
            'dateFrom' => 'required|date',
            'dateTo' => 'required|date'
        ]);

        $dateFrom = date('Y-m-d', strtotime($validated['dateFrom']));
        $dateTo = date('Y-m-d', strtotime($validated['dateTo']));

        $compaignsId = Redis::get($this->title . '_data_metric_chart');

        if(!$compaignsId) {

            $compaignsId = $this->parserForMetricByCompaign($this->yandex->metricIdCompaign()['data']);

            Redis::command('setex', [$this->title . '_data_metric_chart', 60 * 60 * 24, json_encode($compaignsId)]);

        } else {

            $compaignsId = json_decode($compaignsId, 1);

        }

        $dataInvoice = $this->modelInvoice::select('invoice_date', 'invoice_status', 'client_mail', 'invoice_price')
        ->where([
            ['invoice_date', '>=', "$dateFrom 00:00:00"],
            ['invoice_date', '<=', "$dateTo 23:59:59"]
        ])->distinct()->get();

        $sateliPhone = $this->sateliPhone::select('client_phone', 'invoice_status', 'invoice_price', 'invoice_date')->get();

        $haystack = [];
        foreach ($sateliPhone as $key => $value) {
            $haystack[$key] = $value['client_phone'];
        }

        $wikaPhoneBy1C = $this->modelPhone::select('contact_phone_number')->distinct()->get();

        $wikaPhone = [];
        foreach ($wikaPhoneBy1C as $value) {
            $phone = $value['contact_phone_number'];
            $subPhone = mb_substr($phone, 1, strlen($phone) - 1);
            $key = array_search($subPhone, $haystack);

            if(!empty($key) && !empty($sateliPhone[$key])) {
                $wikaPhone[] = $sateliPhone[$key];
            }
        }

        $countInvoice = 0;
        foreach ($dataInvoice as $key => $dateInvoice) {
            $countInvoice++;
        }

        $countPhones = 0;
        foreach ($wikaPhone as $value) {
            if(strtotime("$dateFrom 00:00:00") <= strtotime($value['invoice_date']) && strtotime("$dateTo 23:59:59") >= strtotime($value['invoice_date'])) {
                $countPhones++;
            }
        }

        $countCliks = $this->direct::where('Date', '>=', $dateFrom, 'AND', 'Date', '<=', $dateTo)->whereIn('CampaignId', $compaignsId)->sum('Clicks');

        $invoicePhone = $this->modelPhone::select('contact_phone_number')->distinct()->get();

        $phones = [];
        foreach ($invoicePhone as $value) {
            $phones[] = mb_substr($value['contact_phone_number'], 1, strlen($value['contact_phone_number']) - 1);
        }

        $phonesPrice = $this->sateliPhone::whereIn('client_phone', $phones)->where('invoice_date', '>=', $dateFrom, 'AND', 'invoice_date', '<=', $dateTo)->distinct()->get('invoice_price')->where('invoice_status', 2)->sum('invoice_price');

        $mailPrice = $this->modelInvoice::where('invoice_status', 2)->where('invoice_date', '>=', $dateFrom, 'AND', 'invoice_date', '<=', $dateTo)->distinct()->get('invoice_price')->sum('invoice_price');

        $sumPrice = $this->direct::where('Date', '>=', $dateFrom, 'AND', 'Date', '<=', $dateTo)->whereIn('CampaignId', $compaignsId)->sum('Cost');

        $cpl = (int)$sumPrice / (int)$countCliks;

        $cpc = (int)$sumPrice / ($countInvoice + $countPhones);

        return [
            'cpl' => number_format($cpl, 2, '.', ''),
            'cpc' => number_format($cpc, 2, '.', ''),
            'invoices' => $countInvoice + $countPhones,
            'visits' => $countCliks,
            'invoicesMail' => $countInvoice,
            'invoicePhones' => $countPhones,
            'mailPrice' => number_format($mailPrice, 2, '.', ''),
            'phonePrice' => number_format($phonesPrice, 2, '.', ''),

        ];
    }

    public function getCastomMetric()
    {

        $compaignsId = Redis::get($this->title . '_data_metric_chart');

        if(!$compaignsId) {

            $compaignsId = $this->parserForMetricByCompaign($this->yandex->metricIdCompaign()['data']);

            $countCliks = $this->direct::whereIn('CampaignId', $compaignsId)->sum('Clicks');

            Redis::command('setex', [$this->title . '_data_metric_chart', 60 * 60 * 24, json_encode($compaignsId)]);
            Redis::command('setex', [$this->title . '_count_clicks', 60 * 60 * 24, $countCliks]);

        } else {

            $compaignsId = json_decode($compaignsId, 1);
            $countCliks = Redis::get($this->title . '_count_clicks');

        }

        $invoicePhone = $this->modelPhone::select('contact_phone_number')->distinct()->get();

        $phones = [];
        foreach ($invoicePhone as $value) {
            $phones[] = mb_substr($value['contact_phone_number'], 1, strlen($value['contact_phone_number']) - 1);
        }

        $invoicePhones = $this->sateliPhone::whereIn('client_phone', $phones)->distinct()->get('client_phone');

        $phonesPrice = $this->sateliPhone::whereIn('client_phone', $phones)->distinct()->get('invoice_price')->where('invoice_status', 2)->sum('invoice_price');

        $invoicesMail = $this->modelInvoice::select('invoice_date', 'invoice_status', 'client_mail', 'invoice_price')->distinct()->get();

        $mailPrice = $this->modelInvoice::select('invoice_price')->where('invoice_status', 2)->distinct()->get()->sum('invoice_price');

        $sumPrice = $this->direct::whereIn('CampaignId', $compaignsId)->sum('Cost');

        $countInvoice = $invoicesMail->count();
        $countPhones = $invoicePhones->count();

        $cpl = (int)$sumPrice / (int)$countCliks;

        $cpc = (int)$sumPrice / ($countInvoice + $countPhones);

        return [
            'cpl' => number_format($cpl, 2, '.', ''),
            'cpc' => number_format($cpc, 2, '.', ''),
            'invoices' => $countInvoice + $countPhones,
            'visits' => $countCliks,
            'invoicesMail' => $countInvoice,
            'invoicePhones' => $countPhones,
            'mailPrice' => number_format($mailPrice, 2, '.', ''),
            'phonePrice' => number_format($phonesPrice, 2, '.', ''),

            ];
    }

    private function parserForMetricByCompaign(array $metrics): array
    {
        $data = [];

        foreach ($metrics as $value) {
            $compaignId = $value['dimensions'][0]['name'];
            if(!preg_match('/^[0-9]+$/', $compaignId)) {
                $expoldeCompaignId = explode('_', $compaignId);
                $compaignId = $expoldeCompaignId[count($expoldeCompaignId) - 1];
            }

            if(!preg_match('/^[0-9]+$/', $compaignId)) {
                continue;
            }

            $data[] = $compaignId;
        }

        return $data;
    }

    private function prepareDataEntryPoints($dateFrom, $dateTo): array
    {

        $dates = [];

        $start_date_obj = new \DateTime($dateFrom);
        $end_date_obj = new \DateTime($dateTo);

        $interval = new \DateInterval('P1D');

        $current_date_obj = $start_date_obj;
        while ($current_date_obj <= $end_date_obj) {
            $dates[] = $current_date_obj->format('Y-m-d');
            $current_date_obj->add($interval);
        }

        return $dates;
    }
}
