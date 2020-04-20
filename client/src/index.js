import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

// ANTD
import { ConfigProvider } from "antd";
import itIT from "antd/es/locale/it_IT";

// LEAFLET
import "leaflet/dist/leaflet.css";

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider locale={itIT}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
