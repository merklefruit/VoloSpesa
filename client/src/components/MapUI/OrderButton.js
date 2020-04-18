import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ShoppingTwoTone } from "@ant-design/icons";

import "./mapui.css";

function OrderButton() {
  return (
    <Button className="uibutton-2" shape="circle">
      <Link to="/lista">
        <ShoppingTwoTone /> Ordina
      </Link>
    </Button>
  );
}

export default OrderButton;
