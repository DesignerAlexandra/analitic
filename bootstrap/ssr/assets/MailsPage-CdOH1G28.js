import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { Grid, ButtonGroup, Button, Typography, Container, Skeleton } from "@mui/material";
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
import axios from "axios";
import { G as Guest } from "./GuestLayout-D-NxDWvN.js";
import "@mui/material/Box/index.js";
import "@mui/icons-material";
const ControlPanelComponent = ({ title }) => {
  console.log(title);
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
    /* @__PURE__ */ jsx(Link, { href: route("wika"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.wika, children: "Wika" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("swagelo"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.swagelo, children: "Swagelo" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("hylok"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.hylok, children: "Hylok" }) }),
    /* @__PURE__ */ jsx(Link, { href: route("hy-lok"), children: /* @__PURE__ */ jsx(Button, { disabled: checkDisabled.hy_lok, children: "Hy-lok" }) })
  ] }) }) });
};
function ModalComponent({ open, handleClose, dataModal, skeleton, data }) {
  const render = React.useCallback((obj) => {
    const html = [];
    for (let key in obj) {
      html.push(/* @__PURE__ */ jsxs(Grid, { container: true, className: "card_group", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(Typography, { variant: "h4", children: key }) }),
        /* @__PURE__ */ jsx(Grid, { container: true, className: "card_group_items", children: obj[key].map((elem, i) => {
          let status = "";
          switch (elem.invoice_status) {
            case 0:
              status = "счет создан";
              break;
            case 1:
              status = "счет выставлен";
              break;
            case 2:
              status = "счет оплачен";
              break;
          }
          if (elem.title == "1С") {
            return /* @__PURE__ */ jsx(Grid, { className: "card", container: true, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(Container, { sx: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsx(Typography, { variant: "h5", children: elem.title }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Статус заказа: " }),
                /* @__PURE__ */ jsx("span", { children: status })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Сумма заказа: " }),
                /* @__PURE__ */ jsx("span", { children: elem.invoice_price })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Дата заказа: " }),
                /* @__PURE__ */ jsx("span", { children: elem.invoice_date })
              ] })
            ] }) }) }, i + elem.invoice_date);
          } else {
            return /* @__PURE__ */ jsx(Grid, { className: "card", container: true, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(Container, { sx: { display: "flex", flexDirection: "column" }, children: [
              /* @__PURE__ */ jsx(Typography, { variant: "h5", children: elem.title }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Дата просмотра: " }),
                /* @__PURE__ */ jsx("span", { children: elem.date })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Просмотр: " }),
                /* @__PURE__ */ jsx("span", { children: elem.url })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "домен: " }),
                /* @__PURE__ */ jsx("span", { children: elem.favicon })
              ] }),
              elem.adGroupName ? /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Название рекламной группы: " }),
                /* @__PURE__ */ jsx("span", { children: elem.adGroupName })
              ] }) : "",
              elem.adGroupName ? /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Название рекламной компании: " }),
                /* @__PURE__ */ jsx("span", { children: elem.campaignName })
              ] }) : "",
              elem.adGroupName ? /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Ключевая фраза: " }),
                /* @__PURE__ */ jsx("span", { children: elem.keyPhrase })
              ] }) : "",
              elem.adGroupName ? /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Город: " }),
                /* @__PURE__ */ jsx("span", { children: elem.city })
              ] }) : "",
              elem.adGroupName ? /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "Стоимость перехода по ссылке: " }),
                /* @__PURE__ */ jsx("span", { children: elem.avgCpc })
              ] }) : "",
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "посещения: " }),
                /* @__PURE__ */ jsx("span", { children: elem.meric_visits })
              ] }),
              /* @__PURE__ */ jsxs(Typography, { className: "card_text", variant: "p", children: [
                /* @__PURE__ */ jsx("span", { className: "titile_header", children: "пользователи: " }),
                /* @__PURE__ */ jsx("span", { children: elem.meric_users })
              ] })
            ] }) }) }, i);
          }
        }) })
      ] }));
    }
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
        /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
          /* @__PURE__ */ jsx(Grid, { item: true, xs: 4, sx: { width: "800px", height: "650px" }, children: /* @__PURE__ */ jsxs(Container, { sx: { width: 500, position: "fixed", "&, css-1xgtf4e-MuiContainer-root": { padding: 0 } }, children: [
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "Название сайта: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.title })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "Код клиента: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.code })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "Электронная почта: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.mail })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "ID клиента: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.id })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "Яндекс ID клиента: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.ym_uid })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "Количество переходов по ссылке: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.countClicks })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "общая стоимость переходов по ссылке: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.costClicks })
            ] }),
            /* @__PURE__ */ jsxs(Container, { sx: { marginBottom: 1.2 }, children: [
              /* @__PURE__ */ jsx("p", { className: "titile_header", children: "Сумма оплаты: " }),
              /* @__PURE__ */ jsx("p", { children: dataModal.headers.sumPrice })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs(Grid, { item: true, xs: 8, children: [
            !skeleton ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Grid, { container: true, className: "card_group", children: /* @__PURE__ */ jsx(Grid, { container: true, className: "card_group_items", children: /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", width: 960, height: 260 }) }) }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx(Grid, { container: true, className: "card_group", children: /* @__PURE__ */ jsx(Grid, { container: true, className: "card_group_items", children: /* @__PURE__ */ jsx(Skeleton, { variant: "rectangular", width: 960, height: 260 }) }) })
            ] }) : "",
            dataModal ? render(dataModal.data) : ""
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button$1, { onClick: handleClose, children: "Закрыть" }) })
      ]
    }
  ) });
}
const columns = [
  { id: "mail", label: "Mail", minWidth: 170 },
  { id: "created", label: "счет создан", minWidth: 100 },
  {
    id: "actived",
    label: "выставлен клиенту на оплату",
    minWidth: 170,
    align: "center"
  },
  {
    id: "closed",
    label: "пришла оплата",
    minWidth: 170,
    align: "center"
  },
  {
    id: "createdPrice",
    label: "сумма созданных счетов",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2)
  },
  {
    id: "activedPrice",
    label: "выставленная сумма на оплату",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2)
  },
  {
    id: "closedPrice",
    label: "сума оплаченных счетов",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2)
  }
];
function maskEmailAddress(email) {
  const [username, domain] = email.split("@");
  const maskedDomain = domain.replace(/./g, "*");
  return `${username}@${maskedDomain}`;
}
const converter = (data) => {
  const newData = [];
  const obj = {};
  data.forEach((el) => {
    if (!obj.hasOwnProperty(el.client_mail)) {
      obj[el.client_mail] = {
        created: el.invoice_status == 0 ? 1 : 0,
        createdPrice: el.invoice_status == 0 ? Number(el.invoice_price) : 0,
        actived: el.invoice_status == 1 ? 1 : 0,
        activedPrice: el.invoice_status == 1 ? Number(el.invoice_price) : 0,
        closed: el.invoice_status == 2 ? 1 : 0,
        closedPrice: el.invoice_status == 2 ? Number(el.invoice_price) : 0
      };
    } else {
      obj[el.client_mail] = {
        created: el.invoice_status == 0 ? obj[el.client_mail].created + 1 : obj[el.client_mail].created,
        createdPrice: el.invoice_status == 0 ? obj[el.client_mail].createdPrice + Number(el.invoice_price) : obj[el.client_mail].createdPrice,
        actived: el.invoice_status == 1 ? obj[el.client_mail].actived + 1 : obj[el.client_mail].actived,
        activedPrice: el.invoice_status == 1 ? obj[el.client_mail].activedPrice + Number(el.invoice_price) : obj[el.client_mail].activedPrice,
        closed: el.invoice_status == 2 ? obj[el.client_mail].closed + 1 : obj[el.client_mail].closed,
        closedPrice: el.invoice_status == 2 ? obj[el.client_mail].closedPrice + Number(el.invoice_price) : obj[el.client_mail].closedPrice
      };
    }
  });
  for (let key in obj) {
    newData.push({
      id: key,
      mail: maskEmailAddress(key),
      created: obj[key].created,
      actived: obj[key].actived,
      closed: obj[key].closed,
      createdPrice: obj[key].createdPrice,
      activedPrice: obj[key].activedPrice,
      closedPrice: obj[key].closedPrice
    });
  }
  return newData;
};
function TableComponent({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(converter(data.rows));
  const [open, setOpen] = React.useState(false);
  const [dataModal, setDataModal] = React.useState({
    headers: {
      title: data.title,
      code: "",
      id: "",
      mail: "",
      ym_uid: "",
      countClicks: "",
      costClicks: "",
      sumPrice: ""
    },
    data: {}
  });
  const [skeleton, setSkeleton] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setDataModal({
      headers: {
        title: data.title,
        code: "",
        id: "",
        mail: "",
        ym_uid: "",
        countClicks: "",
        costClicks: "",
        sumPrice: ""
      },
      data: {}
    });
  };
  const fetch = (mail) => {
    setOpen(true);
    setSkeleton(false);
    const data2 = new FormData();
    data2.set("mail", mail);
    let routePath = "";
    switch (dataModal.headers.title) {
      case "wika":
        routePath = "wika.general";
        break;
      case "swagelo":
        routePath = "swagelo.general";
        break;
      case "hylok":
        routePath = "hylok.general";
        break;
    }
    axios.post(route(routePath), data2).then((res) => {
      setSkeleton(true);
      setDataModal({
        ...dataModal,
        data: res.data.data,
        headers: {
          title: dataModal.headers.title,
          code: res.data.client_code,
          id: res.data.client_id,
          mail: maskEmailAddress(res.data.client_mail),
          ym_uid: res.data.client_ym_uid ?? "отсутствует",
          countClicks: res.data.countClicks ?? "отсутствует",
          costClicks: res.data.costClicks ?? "отсутствует",
          sumPrice: res.data.sum_price
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return /* @__PURE__ */ jsxs(Paper, { sx: { width: "100%", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx(TableContainer, { sx: { maxHeight: 600 }, children: /* @__PURE__ */ jsxs(Table, { stickyHeader: true, "aria-label": "sticky table", children: [
      /* @__PURE__ */ jsxs(TableHead, { children: [
        /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { size: "string", align: "left", colSpan: 12, children: /* @__PURE__ */ jsx(Typography, { variant: "h3", children: data.title }) }) }),
        /* @__PURE__ */ jsx(TableRow, { children: columns.map((column) => /* @__PURE__ */ jsx(
          TableCell,
          {
            align: column.align,
            style: { top: 57, minWidth: column.minWidth },
            children: column.label
          },
          column.id
        )) })
      ] }),
      /* @__PURE__ */ jsx(TableBody, { children: rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
        return /* @__PURE__ */ jsx(TableRow, { hover: true, role: "checkbox", tabIndex: -1, sx: { cursor: "pointer" }, onClick: () => fetch(row.id), children: columns.map((column) => {
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
    /* @__PURE__ */ jsx(ModalComponent, { dataModal, handleClose, open, skeleton })
  ] });
}
const MailsPage = ({ data }) => {
  console.log(data);
  const [dateUpdate, setDateUpdate] = useState(data.dateUpdateDirect);
  const updateDirectDate = (date) => {
    setDateUpdate(date);
  };
  return /* @__PURE__ */ jsxs(Guest, { dateUpdateDirect: dateUpdate, updateDirectDate, children: [
    /* @__PURE__ */ jsx(ControlPanelComponent, { title: data.title }),
    /* @__PURE__ */ jsx(Container, { maxWidth: "1600px", children: /* @__PURE__ */ jsx(TableComponent, { data }) })
  ] });
};
export {
  MailsPage as default
};
