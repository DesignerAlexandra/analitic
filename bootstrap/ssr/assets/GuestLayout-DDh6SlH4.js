import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import Box from "@mui/material/Box/index.js";
import { ButtonGroup, Button, Typography, Grid } from "@mui/material";
import { Link } from "@inertiajs/react";
import { PublishedWithChanges, Sync } from "@mui/icons-material";
import axios from "axios";
const checkUpdate = (date) => {
  const dateUpdate = new Date(date);
  const dateTo = /* @__PURE__ */ new Date();
  if (dateUpdate.toDateString() == dateTo.toDateString()) {
    return true;
  } else {
    return false;
  }
};
function Header({ dateUpdateDirect, updateDirectDate }) {
  const [updated, setUpdated] = React.useState(checkUpdate(dateUpdateDirect));
  const [stateButton, setStateButton] = React.useState("warning");
  const [disabled, setDisabled] = React.useState(checkUpdate(dateUpdateDirect));
  const updateDirect = () => {
    setUpdated(true);
    setStateButton("success");
    axios.post(route("update.direct")).then((res) => {
      if (res.data.status) {
        setDisabled(true);
      } else {
        return;
      }
      console.log(res.data);
      updateDirectDate(res.data.date);
    }).catch((err) => {
      console.log(err);
    });
  };
  return /* @__PURE__ */ jsxs(Box, { sx: { width: "100%", height: 100, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "solid 1px" }, children: [
    /* @__PURE__ */ jsxs(ButtonGroup, { variant: "contained", children: [
      /* @__PURE__ */ jsx(Link, { href: route("chart.wika"), children: /* @__PURE__ */ jsx(Button, { children: "Отчеты" }) }),
      /* @__PURE__ */ jsx(Link, { href: route("compaigns.wika"), children: /* @__PURE__ */ jsx(Button, { children: "Аналитика рекламы" }) }),
      /* @__PURE__ */ jsx(Link, { href: route("wika"), children: /* @__PURE__ */ jsx(Button, { children: "Список клиентов" }) })
    ] }),
    /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", gap: 1 }, children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h6", gutterBottom: true, color: "white", maxWidth: "290px", children: [
        "Дата последнего обновления: ",
        dateUpdateDirect
      ] }),
      /* @__PURE__ */ jsx(Button, { disabled, variant: "contained", color: stateButton, onClick: updateDirect, children: updated ? /* @__PURE__ */ jsx(PublishedWithChanges, { sx: { "&, svg": { fontSize: "40px" } } }) : /* @__PURE__ */ jsx(Sync, { sx: { "&, svg": { fontSize: "40px" } } }) })
    ] })
  ] });
}
function Guest({ children, dateUpdateDirect, updateDirectDate }) {
  return /* @__PURE__ */ jsx(Grid, { container: true, sx: { margin: "0 auto" }, children: /* @__PURE__ */ jsxs(Grid, { item: true, sx: { width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ jsx(Grid, { container: true, sx: { width: "100%", background: "black", padding: 1 }, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(Header, { dateUpdateDirect, updateDirectDate }) }) }),
    /* @__PURE__ */ jsx(Grid, { container: true, sx: { maxWidth: "1600px", width: "100%", padding: "15px 0", margin: "0 auto", height: "100%" }, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sx: { margin: "0 auto" }, children }) })
  ] }) });
}
export {
  Guest as G
};
