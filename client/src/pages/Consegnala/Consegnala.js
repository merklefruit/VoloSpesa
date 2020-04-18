import React, { Component } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/Layout/PageLayout";
import { getMessage, deleteMessage } from "../../api/API";

import {
  Typography,
  Space,
  Button,
  Descriptions,
  Modal,
  message,
  Result
} from "antd";
import { WarningTwoTone } from "@ant-design/icons";
import "./consegnala.css";

const { Title, Text } = Typography;
const { confirm } = Modal;

export default class Consegnala extends Component {
  state = {
    messaggio: {},
    ordine: "",
    consegnato: false,
    errore: false
  };

  componentDidMount() {
    const { ordine } = this.props.match.params;
    this.setState(prevState => ({
      ...prevState,
      ordine: ordine
    }));
    getMessage(ordine)
      .then(messaggio => {
        this.setState(prevState => ({
          ...prevState,
          messaggio: messaggio[0]
        }));
      })
      .catch(() => {
        console.log("ERRORE");
        this.setState(prevState => ({
          ...prevState,
          errore: true,
          messaggio: ""
        }));
      });
  }

  render() {
    const cancella = async () => {
      const result = await deleteMessage(this.state.messaggio);
      if (result === 200) {
        message.success("Ordine preso in carico correttamente.");
        this.setState(prevState => ({
          ...prevState,
          consegnato: true
        }));
      } else {
        message.error("Errore del server. Riprova");
        this.setState(prevState => ({
          ...prevState,
          errore: true,
          messaggio: ""
        }));
      }
      Modal.destroyAll();
    };

    return (
      <PageLayout>
        {!this.state.errore ? (
          <div>
            <Title level={2} className="title">
              Consegna la spesa di {this.state.messaggio.nome}
            </Title>

            <Descriptions bordered layout="vertical">
              <Descriptions.Item label="Nome:">
                {this.state.messaggio.nome}
              </Descriptions.Item>
              <Descriptions.Item label="Telefono:">
                <a href={"tel:" + this.state.messaggio.telefono}>
                  {this.state.messaggio.telefono}
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Indirizzo:">
                {this.state.messaggio.indirizzo}
              </Descriptions.Item>
              <Descriptions.Item label="Spesa:">
                {this.state.messaggio.spesa}
              </Descriptions.Item>
            </Descriptions>

            {!this.state.consegnato ? (
              <div className="buttons">
                <Space>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() =>
                      confirm({
                        title: "Sei sicuro?",
                        content:
                          "Una volta confermato, rimuoveremo l'ordine dalla mappa.",
                        onOk() {
                          cancella();
                        },
                        onCancel() {
                          Modal.destroyAll();
                        },
                        centered: true,
                        icon: <WarningTwoTone />,
                        maskClosable: true
                      })
                    }
                  >
                    Accetta la consegna
                  </Button>
                  <Link to="/mappa">
                    <Button size="large" type="ghost">
                      Annulla
                    </Button>
                  </Link>
                </Space>
              </div>
            ) : (
              <div>{/* SUCCESSO CONFERMA DI CONSEGNA */}</div>
            )}
          </div>
        ) : (
          <div>
            {/* GESTIONE ERRORI DATABASE */}
            <Result
              status="error"
              title="Errore interno."
              subTitle=""
              extra={[
                <Button
                  size="large"
                  type="primary"
                  key="console"
                  onClick={() => window.location.reload()}
                >
                  Riprova
                </Button>
              ]}
            >
              <div className="desc">
                <Text>
                  Probabilmente l'ordine che hai cercato è stato consegnato da
                  qualcun altro. <br />
                  Se pensi che sia un bug, puoi contattarci{" "}
                  <Link to="/contatta" style={{ fontWeight: 600 }}>
                    qui
                  </Link>
                  .
                </Text>
              </div>
            </Result>
          </div>
        )}
      </PageLayout>
    );
  }
}
