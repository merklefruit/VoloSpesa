import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { HomeTwoTone } from "@ant-design/icons";

import "./mapui.css";

function HomeButton() {
  return (
    <Button className="uibutton" shape="circle">
      <Link to="/">
        <HomeTwoTone /> Home
      </Link>
    </Button>
  );
}

export default HomeButton;
