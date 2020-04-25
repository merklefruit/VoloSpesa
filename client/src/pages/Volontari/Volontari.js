import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Form, Input, Button, Result } from "antd";
import Geosuggest from "react-geosuggest";
import { addUser } from "../../api/API";
import PageLayout from "../../components/Layout/PageLayout";

import "./volontari.css";
import "../Lista/lista.css";

const { Title, Text } = Typography;

export default class Volontari extends Component {
  state = {
    nome: "",
    email: "",
    indirizzo: "",
    telefono: "",
    error: false,
    done: false
  };

  valueChanged = changedValues => {
    const key = Object.keys(changedValues)[0];
    const value = Object.values(changedValues)[0];
    this.setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  onSuggestSelect = suggest => {
    if (suggest != null) {
      this.setState(prevState => ({
        ...prevState,
        ...prevState,
        indirizzo: suggest.description,
        latitudine: suggest.location.lat,
        longitudine: suggest.location.lng
      }));
    }
  };

  formSubmitted = async event => {
    event.preventDefault();
    const user = {
      nome: this.state.nome,
      email: this.state.email,
      indirizzo: this.state.indirizzo,
      latitudine: this.state.latitudine,
      longitudine: this.state.longitudine,
      telefono: this.state.longitudine
    };
    const status = await addUser(user);
    if (status !== 200) {
      this.setState(prevState => ({
        ...prevState,
        error: true
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        done: true
      }));
    }
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
              {!this.state.error && !this.state.done && (
                <div>
                  <Title level={2}>Iscriviti adesso</Title>
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

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Per favore, inserisci la tua mail!"
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
                    <Button
                      type="primary"
                      size="large"
                      onClick={this.formSubmitted}
                    >
                      Conferma
                    </Button>
                  </Form>
                </div>
              )}

              {/* VALIDATION */}
              {this.state.done && (
                <Result
                  status="success"
                  title="Registrazione completata!"
                  subTitle="Ti informeremo quando ci sarà una richiesta vicino a te."
                />
              )}
              {this.state.error && (
                <Result
                  status="error"
                  title="Errore nella registrazione."
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
                      Sei sicuro di aver riempito correttamente tutti i campi?
                      <br />
                      Se questo errore persiste, puoi contattarci{" "}
                      <Link
                        to="/contatta"
                        style={{ fontWeight: 600 }}
                        key={this.state.nome}
                      >
                        qui
                      </Link>
                      .
                    </Text>
                  </div>
                </Result>
              )}
            </div>
          </Card>
        </div>
      </PageLayout>
    );
  }
}
