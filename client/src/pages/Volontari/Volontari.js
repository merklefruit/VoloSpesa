import React from "react";
import { Typography, Card } from "antd";
import PageLayout from "../../components/Layout/PageLayout";

import "./volontari.css";

const { Title, Text } = Typography;

function Volontari() {
  return (
    <PageLayout>
      <div className="center">
        <Title level={1}>Diventa un Volontario</Title>
        <p style={{ marginTop: 25 }}></p>
        video di spiegazione
        <p style={{ marginTop: 25 }}></p>
        <Card className="card">
          <Title level={4}>
            Ecco tutte le informazioni che ti occorre conoscere per iniziare a
            fare volontariato nella tua città
          </Title>
          <Text className="lead-2">Informazioni utilissime...</Text>
        </Card>
      </div>
    </PageLayout>
  );
}

export default Volontari;
