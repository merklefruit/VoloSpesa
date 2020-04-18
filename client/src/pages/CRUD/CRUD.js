import React, { Component } from "react";
import PageLayout from "../../components/Layout/PageLayout";
import { List, Typography, Button, Space, Modal, message } from "antd";
import { getMessages, deleteMessage } from "../../api/API";

import { ShopTwoTone, DeleteTwoTone } from "@ant-design/icons";
import "./crud.css";

const { Title, Text } = Typography;
const { info, confirm } = Modal;

export default class CRUD extends Component {
  state = {
    messages: [],
    auth: false,
    loaded: false
  };
  componentDidMount() {
    getMessages().then(messages => {
      this.setState(prevState => ({
        ...prevState,
        messages: messages,
        loaded: true
      }));
    });
  }

  render() {
    const rimuovi = mess => {
      confirm({
        title: "Sei sicuro?",
        icon: <DeleteTwoTone />,
        content: "Azione permanente sul database.",
        okText: "Si",
        onOk: () => rimuoviMessaggio(mess)
      });
      async function rimuoviMessaggio(mess) {
        const result = await deleteMessage(mess);
        if (result !== 200) {
          message.error("Errore del server. Riprova più tardi.");
        } else {
          message.success("Oggetto eliminato correttamente");
          setTimeout(() => {
            refresh();
          }, 2500);
        }
      }
    };

    const refresh = () => {
      window.location.reload();
    };

    return (
      <PageLayout>
        <div>
          <div style={{ display: "flex" }}>
            <Title level={2}>Lista: </Title>
            <Button
              type="primary"
              className="refresh-button"
              onClick={() => refresh()}
            >
              Refresh
            </Button>
            <Text className="mess-length">
              ({Object.keys(this.state.messages).length} ordini)
            </Text>
          </div>
          <div>
            <List
              itemLayout="vertical"
              bordered={true}
              loading={!this.state.loaded}
              dataSource={this.state.messages}
              renderItem={messaggio => (
                <div>
                  <List.Item>
                    <div>
                      <Text strong>Nome: </Text>
                      <Text>{messaggio.nome}</Text>
                    </div>
                    <div>
                      <Text strong>Indirizzo: </Text>
                      <Text>{messaggio.indirizzo}</Text>
                    </div>
                    <div>
                      <Text strong>Coordinate: </Text>
                      <Text>
                        LAT: {messaggio.latitudine} LONG:{" "}
                        {messaggio.longitudine}
                      </Text>
                    </div>
                    <div>
                      <Text strong>Telefono: </Text>
                      <Text>{messaggio.telefono}</Text>
                    </div>
                    <div>
                      <Text strong>Data: </Text>
                      <Text>{new Date(messaggio.date).toLocaleString()}</Text>
                    </div>

                    <div className="inline">
                      <Space>
                        <Button
                          type="default"
                          onClick={() =>
                            info({
                              title: "Spesa di: " + messaggio.nome,
                              icon: <ShopTwoTone />,
                              content: messaggio.spesa
                            })
                          }
                        >
                          Vedi Spesa
                        </Button>
                        <Button
                          type="danger"
                          onClick={() => rimuovi(messaggio)}
                        >
                          Rimuovi
                        </Button>
                      </Space>
                    </div>
                  </List.Item>
                </div>
              )}
            />
          </div>
        </div>
      </PageLayout>
    );
  }
}
