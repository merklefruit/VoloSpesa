import React from "react";
import { Statistic, Card, Row, Col, Typography } from "antd";

import PageLayout from "../../components/Layout/PageLayout";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "./statistiche.css";

const { Title } = Typography;

function Statistiche() {
  return (
    <PageLayout>
      <Title level={2} style={{ textAlign: "center" }}>
        Statistiche
      </Title>
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Attivi"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Inattivi"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}

export default Statistiche;
