import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { Grid, ButtonGroup, Button, Box, Typography, Skeleton } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper/index.js";
import Table from "@mui/material/Table/index.js";
import TableBody from "@mui/material/TableBody/index.js";
import TableCell from "@mui/material/TableCell/index.js";
import TableContainer from "@mui/material/TableContainer/index.js";
import TableHead from "@mui/material/TableHead/index.js";
import TablePagination from "@mui/material/TablePagination/index.js";
import TableRow from "@mui/material/TableRow/index.js";
import Button$1 from "@mui/material/Button/index.js";
import Dialog from "@mui/material/Dialog/index.js";
import DialogActions from "@mui/material/DialogActions/index.js";
import DialogContent from "@mui/material/DialogContent/index.js";
import { G as Guest } from "./GuestLayout-CzFaFlHE.js";
import axios from "axios";
import "@mui/material/Box/index.js";
import "@mui/icons-material";
const ControlPanelComponent = ({ title }) => {
  const state = {
    wika: false,
    swagelo: false,
    hylok: false,
    hy_lok: false
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
    }
  }, [title]);
  return /* @__PURE__ */ jsx(Grid, { container: true, sx: { padding: "10px" }, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(ButtonGroup, { color: "info", variant: "contained", size: "large", "aria-label": "Large button group", children: [
    /* @__PURE__ */ jsx(Link, { href: route("compaigns.wika"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.wika, children: "Wika" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("compaigns.swagelo"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.swagelo, children: "Swagelo" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("compaigns.hylok"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.hylok, children: "Hylok" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("compaigns.hy-lok"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.hy_lok, children: "Hy-lok" }) })
  ] }) }) });
};
function ModalComponent({ open, handleClose, skeleton, dataForModal }) {
  console.log(dataForModal);
  const render = React.useCallback((obj) => {
    const groups = [];
    const clients = [];
    for (let key in obj.groups) {
      groups.push(
        /* @__PURE__ */ jsxs(Box, { className: "compaigns_card", sx: { maxWidth: "360px", borderRight: "solid 1px" }, children: [
          /* @__PURE__ */ jsxs(Typography, { display: "flex", justifyContent: "space-between", className: "card_text compaigns_text_card", variant: "p", children: [
            /* @__PURE__ */ jsx("span", { display: "flex", justifyContent: "space-between", className: "titile_header", children: "Название: " }),
            /* @__PURE__ */ jsx("span", { children: obj.groups[key].adGroupName })
          ] }),
          /* @__PURE__ */ jsxs(Typography, { display: "flex", justifyContent: "space-between", className: "card_text compaigns_text_card", variant: "p", children: [
            /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Количество кликов: " }),
            /* @__PURE__ */ jsx("span", { children: obj.groups[key].clicks })
          ] }),
          /* @__PURE__ */ jsxs(Typography, { display: "flex", justifyContent: "space-between", className: "card_text compaigns_text_card", variant: "p", children: [
            /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Cумма затрат: " }),
            /* @__PURE__ */ jsx("span", { children: obj.groups[key].cost.toFixed(2) })
          ] })
        ] })
      );
    }
    console.log(obj.clients);
    for (let key in obj.clients) {
      obj.clients[key].forEach((el) => {
        el.forEach((client) => {
          clients.push(
            /* @__PURE__ */ jsxs(Box, { className: "compaigns_card", sx: { maxWidth: "860px" }, children: [
              /* @__PURE__ */ jsxs(Typography, { display: "flex", justifyContent: "space-between", className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Email клиента: " }),
                /* @__PURE__ */ jsx("span", { children: client.client_mail })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { display: "flex", justifyContent: "space-between", className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Сумма покупок: " }),
                /* @__PURE__ */ jsx("span", { children: client.invoice_price })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { display: "flex", justifyContent: "space-between", className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Дата покупки: " }),
                /* @__PURE__ */ jsx("span", { children: client.invoice_date })
              ] })
            ] })
          );
        });
      });
    }
    const html = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Grid, { item: true, sx: { maxWidth: "500px", width: "100%" }, xs: 4, children: groups.map((el) => el) }),
      /* @__PURE__ */ jsx(Grid, { sx: { maxWidth: "360px", width: "100%" }, item: true, xs: 6, children: clients.map((el) => el) })
    ] });
    return html;
  });
  return /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsxs(
    Dialog,
    {
      open,
      onClose: handleClose,
      "aria-labelledby": "alert-dialog-title",
      "aria-describedby": "alert-dialog-description",
      maxWidth: "xl",
      children: [
        /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { width: "1200px", height: "760px" }, children: [
          !skeleton ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 4, children: /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", width: 360, height: 660 }) }),
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, children: /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", width: 760, height: 660 }) })
          ] }) : "",
          dataForModal ? render(dataForModal) : ""
        ] }) }),
        /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button$1, { onClick: handleClose, children: "Закрыть" }) })
      ]
    }
  ) });
}
const columns = [
  { id: "title", label: "Название компании", minWidth: 170 },
  {
    id: "clients",
    label: "количество клиентов по 1С",
    minWidth: 170,
    align: "center",
    format: (value) => value
  },
  {
    id: "clicks",
    label: "общее количество кликов",
    minWidth: 170,
    align: "center",
    format: (value) => value
  },
  {
    id: "cost",
    label: "сумма затрат на компанию",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2)
  },
  {
    id: "profit",
    label: "прибыль по клиентам из 1С",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2)
  }
];
const counterClients = (obj) => {
  let count = 0;
  for (let key in obj) {
    count += obj[key].length;
  }
  return count;
};
const countProfit = (obj) => {
  let count = 0;
  for (let key in obj) {
    obj[key].forEach((el) => {
      el.forEach((client) => {
        count += Number(client.invoice_price);
      });
    });
  }
  return count;
};
const preparation = (compaignData) => {
  let rows = [];
  for (let key in compaignData) {
    rows.push({
      title: compaignData[key].compaignName,
      clients: counterClients(compaignData[key].clients),
      clicks: compaignData[key].clicks,
      cost: compaignData[key].cost.toFixed(2),
      profit: countProfit(compaignData[key].clients),
      id: key
    });
  }
  return rows;
};
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
function TableComponent({ compaignsData }) {
  const [page, setPage2] = React.useState(0);
  const [rowsPerPage, setRowsPerPage2] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [skeleton, setSkeleton] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [dataForModal, setDataForModal] = React.useState([]);
  const openModal = (id) => {
    setOpen(true);
    setDataForModal(compaignsData[id]);
    setSkeleton(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    setRows(preparation(compaignsData));
  }, [compaignsData]);
  return /* @__PURE__ */ jsxs(Paper, { sx: { width: "100%", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx(TableContainer, { sx: { maxHeight: 600 }, children: /* @__PURE__ */ jsxs(Table, { stickyHeader: true, "aria-label": "sticky table", children: [
      /* @__PURE__ */ jsxs(TableHead, { children: [
        /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { size: "string", align: "left", colSpan: 12, children: /* @__PURE__ */ jsx(Typography, { variant: "h3" }) }) }),
        /* @__PURE__ */ jsx(TableRow, { children: columns.map((column) => /* @__PURE__ */ jsx(
          TableCell,
          {
            align: column.align,
            style: { minWidth: column.minWidth },
            children: column.label
          },
          column.id
        )) })
      ] }),
      /* @__PURE__ */ jsx(TableBody, { children: rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
        return /* @__PURE__ */ jsx(TableRow, { hover: true, role: "checkbox", tabIndex: -1, sx: { cursor: "pointer" }, onClick: () => openModal(row.id), children: columns.map((column) => {
          const value = row[column.id];
          return /* @__PURE__ */ jsx(TableCell, { align: column.align, children: column.format && typeof value === "number" ? column.format(value) : value }, column.id);
        }) }, key);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      TablePagination,
      {
        rowsPerPageOptions: [10, 25, 100],
        component: "div",
        count: rows.length,
        rowsPerPage,
        page,
        onPageChange: handleChangePage,
        onRowsPerPageChange: handleChangeRowsPerPage,
        labelRowsPerPage: "Выводить по :"
      }
    ),
    /* @__PURE__ */ jsx(ModalComponent, { handleClose, open, skeleton, dataForModal })
  ] });
}
const Compaigns = ({ data }) => {
  const [compaigns, setCompaigns] = useState([]);
  const [routePath] = useState(data.routePath);
  const [loader, setLoader] = useState(false);
  const updateDirectDate = (date) => {
    setDateUpdate(date);
  };
  const fetchInvoice = () => {
    let routing = "compaigns.wika.invoice";
    switch (routePath) {
      case "wika":
        routing = "compaigns.wika.invoice";
        break;
      case "swagelo":
        routing = "compaigns.swagelo.invoice";
        break;
      case "hylok":
        routing = "compaigns.hylok.invoice";
        break;
      case "hy-lok":
        routing = "compaigns.hy-lok.invoice";
        break;
    }
    axios.post(route(routing)).then((result) => {
      console.log(result.data);
      setCompaigns(result.data.direct);
      setLoader(true);
    }).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    fetchInvoice();
  }, []);
  return /* @__PURE__ */ jsxs(Guest, { dateUpdateDirect: data.dateUpdateDirect, updateDirectDate, children: [
    /* @__PURE__ */ jsx(ControlPanelComponent, { title: data.routePath }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx(Grid, { container: true, children: /* @__PURE__ */ jsx(TableComponent, { compaignsData: compaigns }) })
  ] });
};
export {
  Compaigns as default
};
