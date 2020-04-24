import React, { Component } from "react";
import { Typography, Card, Form, Input } from "antd";
import Geosuggest from "react-geosuggest";

import PageLayout from "../../components/Layout/PageLayout";

import "./volontari.css";
import "../Lista/lista.css";

const { Title, Text } = Typography;

export default class Volontari extends Component {
  state = {
    nome: "",
    indirizzo: "",
    telefono: ""
  };

  valueChanged = changedValues => {
    const key = Object.keys(changedValues)[0];
    const value = Object.values(changedValues)[0];
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  render() {
    return (
      <PageLayout>
        <div className="center">
          <Title level={1}>Diventa un Volontario</Title>
          <p style={{ marginTop: 25 }}></p>
          (video di spiegazione da aggiungere qui)
          <p style={{ marginTop: 25 }}></p>
          <Card className="card">
            <Title level={4}>
              Ecco tutte le informazioni che ti occorre conoscere per iniziare a
              fare volontariato nella tua città
            </Title>
            <Text className="lead-2">
              Informazioni utilissime...
              <br />
              Informazioni utilissime...
              <br />
              Informazioni utilissime...
              <br />
              Informazioni utilissime...
              <br />
            </Text>
          </Card>
          {/* FORM */}
          <p style={{ marginTop: 25 }}></p>
          <Card className="card">
            <div className="formdiv">
              <Form>
                <Form
                  labelCol={{ span: 3 }}
                  size="large"
                  name="spesa"
                  hideRequiredMark={true}
                  onFinish=""
                  onFinishFailed=""
                  onValuesChange={this.valueChanged}
                >
                  <Form.Item
                    className="form-name"
                    label="Nome"
                    name="nome"
                    rules={[
                      {
                        required: true,
                        message: "Per favore, inserisci il tuo nome!"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* GEOSUGGEST GEOCODER GOOGLE MAPS */}
                  <Form.Item
                    label="Indirizzo"
                    name="indirizzo"
                    rules={[
                      {
                        required: true,
                        message: "Per favore, inserisci il tuo indirizzo!"
                      }
                    ]}
                  >
                    <Geosuggest
                      onSuggestSelect={this.onSuggestSelect}
                      placeholder=""
                      minLength="4"
                      country="it"
                    />
                  </Form.Item>

                  <Form.Item
                    className="form-telephone"
                    label="Telefono"
                    name="telefono"
                    rules={[
                      {
                        required: true,
                        message: "Per favore, inserisci il tuo numero!"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </Form>
            </div>
          </Card>
        </div>
      </PageLayout>
    );
  }
}
