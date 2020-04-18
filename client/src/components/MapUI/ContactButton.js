import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { CustomerServiceTwoTone } from "@ant-design/icons";

import "./mapui.css";

function ContactButton() {
  return (
    <Button className="uibutton-3" shape="circle">
      <Link to="/contatta">
        <CustomerServiceTwoTone /> Chi Siamo
      </Link>
    </Button>
  );
}

export default ContactButton;
