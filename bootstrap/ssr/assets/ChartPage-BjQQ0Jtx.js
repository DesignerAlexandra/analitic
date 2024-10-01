import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createRef } from "react";
import { RestartAlt } from "@mui/icons-material";
import Chart from "chart.js/auto";
import { G as Guest } from "./GuestLayout-DDh6SlH4.js";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/index.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/index.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/index.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/index.js";
import { ruRU } from "@mui/x-date-pickers/locales/index.js";
import { Link } from "@inertiajs/react";
import { Grid, ButtonGroup, Button, Typography, Container, Box, Alert, Skeleton } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table/index.js";
import TableBody from "@mui/material/TableBody/index.js";
import TableCell from "@mui/material/TableCell/index.js";
import TableContainer from "@mui/material/TableContainer/index.js";
import TableHead from "@mui/material/TableHead/index.js";
import TableRow from "@mui/material/TableRow/index.js";
import Paper from "@mui/material/Paper/index.js";
import "@mui/material/Box/index.js";
function CalendarComponent({ lable, dateChange }) {
  return /* @__PURE__ */ jsx(LocalizationProvider, { localeText: ruRU, dateAdapter: AdapterDayjs, children: /* @__PURE__ */ jsx(DemoContainer, { components: ["DatePicker"], children: /* @__PURE__ */ jsx(DatePicker, { format: "DD/MM/YYYY", label: lable, onChange: (e) => dateChange(e), sx: { "& [type='text']:focus": { boxShadow: "none" } } }) }) });
}
const ControlPanelComponent = ({ title }) => {
  const state = {
    wika: false,
    swagelo: false,
    hylok: false,
    hy_lok: false,
    fluidLine: false
  };
  const [checkDisabled, setCheckDisabled] = useState(state);
  useEffect(() => {
    switch (title) {
      case "wika":
        setCheckDisabled({ ...checkDisabled, wika: true });
        break;
      case "swagelo":
        setCheckDisabled({ ...checkDisabled, swagelo: true });
        break;
      case "hylok":
        setCheckDisabled({ ...checkDisabled, hylok: true });
        break;
      case "hy-lok":
        setCheckDisabled({ ...checkDisabled, hy_lok: true });
        break;
      case "fluidLine":
        setCheckDisabled({ ...checkDisabled, fluidLine: true });
        break;
    }
  }, [title]);
  return /* @__PURE__ */ jsx(Grid, { container: true, sx: { padding: "10px" }, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(ButtonGroup, { color: "info", variant: "contained", size: "large", "aria-label": "Large button group", children: [
    /* @__PURE__ */ jsx(Link, { href: route("chart.wika"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.wika, children: "Wika" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("chart.swagelo"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.swagelo, children: "Swagelo" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("chart.hylok"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.hylok, children: "Hylok" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("chart.hy-lok"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.hy_lok, children: "Hy-lok" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("chart.fluidLine"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.fluidLine, children: "fluidLine" }) })
  ] }) }) });
};
const ControlPanelComponent$1 = ControlPanelComponent;
function BasicTable({ castomMetric }) {
  return /* @__PURE__ */ jsx(TableContainer, { component: Paper, children: /* @__PURE__ */ jsxs(Table, { sx: { minWidth: 650, padding: "15px 0" }, "aria-label": "simple table", children: [
    /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { sx: { background: "rgba(1,87,155,.6)" }, children: [
      /* @__PURE__ */ jsx(TableCell, { align: "left" }),
      /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx("span", { style: { fontSize: "18px" }, children: "Визиты" }) }),
      /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx("span", { style: { fontSize: "18px" }, children: "Заявки" }) }),
      /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx("span", { style: { fontSize: "18px" }, children: "CPL" }) }),
      /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx("span", { style: { fontSize: "18px" }, children: "CPC" }) }),
      /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx("span", { style: { fontSize: "18px" }, children: "Cумма оплаченных счетов" }) })
    ] }) }),
    /* @__PURE__ */ jsxs(TableBody, { children: [
      /* @__PURE__ */ jsxs(
        TableRow,
        {
          sx: { "&:last-child td, &:last-child th": { border: 0 } },
          children: [
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Директ" }) }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.visits }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.cpl }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.cpc }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        TableRow,
        {
          sx: { "&:last-child td, &:last-child th": { border: 0 } },
          children: [
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Письма" }) }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.invoicesMail }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.mailPrice })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        TableRow,
        {
          sx: { "&:last-child td, &:last-child th": { border: 0 } },
          children: [
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Звонки" }) }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.invoicePhones }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: "--" }),
            /* @__PURE__ */ jsx(TableCell, { align: "center", children: castomMetric.phonePrice })
          ]
        }
      )
    ] })
  ] }) });
}
function ChartPage({ chartPhone, chartMail, entryPoints, generalData, dateUpdateDirect, title }) {
  const reset = () => {
    chart.data.labels = entryPoints.map((point) => point);
    chart.data.datasets = [
      {
        label: "Количества писем за период",
        data: parse(chartMail).map((row) => row.count)
      },
      {
        label: "Количества звонков за период",
        data: parse(chartPhone).map((row) => row.count)
      }
    ];
    chart.update();
    setInvoiceData(generalData);
    setCastopMetric(false);
    fetchCastomMetric();
  };
  const parse = (chartData) => {
    const data = [];
    for (let key in chartData) {
      data.push({ date: key, count: chartData[key] });
    }
    return data;
  };
  const switchData = () => {
    if (dateFrom.length == 0 || dateTo.length == 0) {
      setDateError(true);
      return;
    }
    if (new Date(dateFrom) > new Date(dateTo)) {
      setDateError(true);
      return;
    }
    setDateError(false);
    const data = new FormData();
    data.set("dateFrom", dateFrom);
    data.set("dateTo", dateTo);
    let routePath = "";
    switch (titleSite) {
      case "wika":
        routePath = "chart.wika.byDate";
        break;
      case "swagelo":
        routePath = "chart.swagelo.byDate";
        break;
      case "hylok":
        routePath = "chart.hylok.byDate";
        break;
      case "hy-lok":
        routePath = "chart.hy-lok.byDate";
        break;
      case "fluidLine":
        routePath = "chart.fluidLine.byDate";
        break;
    }
    axios.post(route(routePath), data).then((res) => {
      setInvoiceData({
        ...invoiveData,
        countMails: res.data.countMails,
        sumPriceForMails: res.data.sumPriceForMails,
        countCalls: res.data.countCalls,
        sumPriceForCalls: res.data.sumPriceForCalls
      });
      fetchCastomMetricByDate(dateFrom, dateTo);
      chart.data.labels = res.data.entryPoints.map((point) => point);
      chart.data.datasets = [
        {
          label: "Количества писем за период",
          data: parse(res.data.chartInvoice).map((row) => row.count)
        },
        {
          label: "Количества звонков за период",
          data: parse(res.data.chartPhone).map((row) => row.count)
        }
      ];
      chart.update();
    }).catch((err) => console.log(err));
  };
  console.log(generalData);
  const [dataMail, setDataMail] = useState(parse(chartMail));
  const [dataPhone, setDataPhone] = useState(parse(chartPhone));
  const [dataEntryPoints, setDataEntryPoints] = useState(entryPoints);
  useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [invoiveData, setInvoiceData] = useState(generalData);
  const [dateError, setDateError] = useState(false);
  const [chart, setChart] = useState("");
  const [titleSite, setTitleSite] = useState(title);
  const [dateUpdate, setDateUpdate] = useState(dateUpdateDirect);
  const [castomMetric, setCastopMetric] = useState(false);
  const fetchCastomMetric = () => {
    let routePath = "";
    switch (titleSite) {
      case "wika":
        routePath = "chart.wika.castom";
        break;
      case "swagelo":
        routePath = "chart.swagelo.castom";
        break;
      case "hylok":
        routePath = "chart.hylok.castom";
        break;
      case "hy-lok":
        routePath = "chart.hy-lok.castom";
        break;
      case "fluidLine":
        routePath = "chart.fluidLine.castom";
        break;
    }
    axios.post(route(routePath)).then(async (res) => {
      setCastopMetric({
        cpl: res.data.cpl,
        cpc: res.data.cpc,
        invoices: res.data.invoices,
        visits: res.data.visits,
        invoicesMail: res.data.invoicesMail,
        invoicePhones: res.data.invoicePhones,
        mailPrice: res.data.mailPrice,
        phonePrice: res.data.phonePrice
      });
    }).catch((err) => {
      console.log(err);
    });
  };
  const fetchCastomMetricByDate = (dateFrom2, dateTo2) => {
    const data = new FormData();
    data.set("dateFrom", dateFrom2);
    data.set("dateTo", dateTo2);
    setCastopMetric(false);
    let routePath = "";
    switch (titleSite) {
      case "wika":
        routePath = "chart.wika.byDateCastom";
        break;
      case "swagelo":
        routePath = "chart.swagelo.byDateCastom";
        break;
      case "hylok":
        routePath = "chart.hylok.byDateCastom";
        break;
      case "hy-lok":
        routePath = "chart.hy-lok.byDateCastom";
        break;
      case "fluidLine":
        routePath = "chart.fluidLine.byDateCastom";
        break;
    }
    axios.post(route(routePath), data).then(async (res) => {
      console.log(true);
      setCastopMetric({
        cpl: res.data.cpl,
        cpc: res.data.cpc,
        invoices: res.data.invoices,
        visits: res.data.visits,
        invoicesMail: res.data.invoicesMail,
        invoicePhones: res.data.invoicePhones,
        mailPrice: res.data.mailPrice,
        phonePrice: res.data.phonePrice
      });
    }).catch((err) => {
      console.log(err);
    });
  };
  const fromDateChange = (e) => {
    setDateFrom(e.year() + "-" + (e.month() + 1) + "-" + e.date());
  };
  const toDateChange = (e) => {
    setDateTo(e.year() + "-" + (e.month() + 1) + "-" + e.date());
  };
  const chartRef = createRef(null);
  const load = async function(entryPoints2, dataMail2, dataPhone2) {
    const newChart = new Chart(
      chartRef.current,
      {
        type: "line",
        data: {
          labels: entryPoints2.map((point) => point),
          datasets: [
            {
              label: "Количества писем за период",
              data: dataMail2.map((row) => row.count)
            },
            {
              label: "Количества звонков за период",
              data: dataPhone2.map((row) => row.count)
            }
          ]
        }
      }
    );
    setChart(newChart);
  };
  const updateDirectDate = (date) => {
    setDateUpdate(date);
  };
  useEffect(() => {
    load(dataEntryPoints, dataMail, dataPhone);
    fetchCastomMetric();
  }, []);
  return /* @__PURE__ */ jsxs(Guest, { dateUpdateDirect: dateUpdate, updateDirectDate, children: [
    /* @__PURE__ */ jsx(ControlPanelComponent$1, { title }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsxs(Grid, { item: true, xs: 8, children: [
      /* @__PURE__ */ jsxs(Container, { sx: { display: "flex", justifyContent: "start", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsx(CalendarComponent, { lable: "Начало периода", dateChange: fromDateChange }),
        /* @__PURE__ */ jsx(CalendarComponent, { lable: "Конец периода", dateChange: toDateChange }),
        /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", flexDirection: "column", flexGrow: "8px", rowGap: 0.5, padding: "4px" }, children: [
          /* @__PURE__ */ jsx(Button, { variant: "contained", color: "primary", onClick: switchData, children: "Просмотреть" }),
          /* @__PURE__ */ jsxs(Button, { variant: "contained", color: "primary", onClick: reset, children: [
            "Сбросить",
            /* @__PURE__ */ jsx(RestartAlt, {})
          ] })
        ] }),
        dateError ? /* @__PURE__ */ jsx(Alert, { severity: "error", children: "Не корректный диапазон даты" }) : ""
      ] }),
      /* @__PURE__ */ jsx("hr", { style: { marginTop: "15px" } })
    ] }),
    /* @__PURE__ */ jsxs(Grid, { container: true, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsx(Box, { className: "present_data_box", padding: "15px 0", alignItems: "center", children: /* @__PURE__ */ jsxs(Box, { paddingRight: "5px", maxWidth: "250px", width: "100%", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Письма" }),
        /* @__PURE__ */ jsxs(Typography, { children: [
          /* @__PURE__ */ jsx("span", { className: "titile_header", children: "общее количество писем: " }),
          invoiveData.countMails
        ] }),
        /* @__PURE__ */ jsxs(Typography, { children: [
          /* @__PURE__ */ jsx("span", { className: "titile_header", children: "сумма оплаченных счетов: " }),
          invoiveData.sumPriceForMails
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsx(Box, { className: "present_data_box", padding: "15px 0", alignItems: "center", children: /* @__PURE__ */ jsxs(Box, { paddingRight: "5px", maxWidth: "250px", width: "100%", children: [
        /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Звонки" }),
        /* @__PURE__ */ jsxs(Typography, { children: [
          /* @__PURE__ */ jsx("span", { className: "titile_header", children: "общее количество звонков: " }),
          invoiveData.countCalls
        ] }),
        /* @__PURE__ */ jsxs(Typography, { children: [
          /* @__PURE__ */ jsx("span", { className: "titile_header", children: "сумма оплаченных счетов: " }),
          invoiveData.sumPriceForCalls
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("hr", { style: { margin: "10px 0" } }),
    /* @__PURE__ */ jsx(Grid, { container: true, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("canvas", { style: { width: "1400px", height: "500px", margin: "0 auto" }, ref: chartRef, id: "acquisitions" }) }) }) }),
    /* @__PURE__ */ jsx(Grid, { container: true, padding: "10px 0", margin: "10px", children: !castomMetric ? /* @__PURE__ */ jsx(Skeleton, { width: "100%", height: 250 }) : /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(BasicTable, { castomMetric }) }) })
  ] });
}
export {
  ChartPage as default
};
