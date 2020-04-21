import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import "./layout.css";
import Logo from "../../static/img/logo-banner.png";
const { Header, Content, Footer } = Layout;

function PageLayout({ children }) {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={Logo} alt="logo" style={{ width: 200 }}></img>
          </Link>
        </div>
      </Header>
      <Content className="contentdiv">
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        &copy; 2020 — <Link to="/contatta">Contatti</Link> —{" "}
        <Link to="/privacy">Privacy</Link>
      </Footer>
    </Layout>
  );
}

export default PageLayout;
