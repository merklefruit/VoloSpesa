import React, { Component } from "react";
import { Link } from "react-router-dom";
import Geosuggest from "react-geosuggest";
import PageLayout from "../../components/Layout/PageLayout";
import { Steps, Button, Typography, Form, Input, Result } from "antd";
import { sendMessage } from "../../api/API";

import "./lista.css";

const { Step } = Steps;
const { Title, Text } = Typography;

const steps = [
  {
    title: "Come funziona"
  },
  {
    title: "I tuoi dati"
  },
  {
    title: "Spesa"
  }
];

export default class Lista extends Component {
  state = {
    current: 0,
    loading: false,
    error: false,
    redirect: false,
    message: {
      nome: "",
      indirizzo: "",
      latitudine: "",
      longitudine: "",
      telefono: "",
      spesa: ""
    }
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  valueChanged = changedValues => {
    const key = Object.keys(changedValues)[0];
    const value = Object.values(changedValues)[0];
    this.setState(prevState => ({
      message: {
        ...prevState.message,
        [key]: value
      }
    }));
  };

  formSubmitted = async event => {
    event.preventDefault();

    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    const {
      nome,
      indirizzo,
      latitudine,
      longitudine,
      telefono,
      spesa
    } = this.state.message;
    const messaggio = {
      nome,
      indirizzo,
      latitudine,
      longitudine,
      telefono,
      spesa
    };
    const status = await sendMessage(messaggio);
    if (status !== 200) {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        error: true
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        redirect: true
      }));
    }
  };

  onSuggestSelect = suggest => {
    if (suggest != null) {
      this.setState(prevState => ({
        ...prevState,
        message: {
          ...prevState.message,
          indirizzo: suggest.description,
          latitudine: suggest.location.lat,
          longitudine: suggest.location.lng
        }
      }));
    }
  };

  render() {
    const { current, redirect, error } = this.state;
    return (
      <PageLayout>
        <div>
          <Steps className="antsteps-custom" current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {// STEP 1
          current === 0 && (
            <div>
              <div className="steps-content">
                <div style={{ textAlign: "center" }}>
                  <Title level={2}>
                    Con VoloSpesa è semplicissimo ordinare la spesa!
                  </Title>
                  <Title level={4}>
                    In pochi click potrai ordinare la spesa a casa tua, e dei
                    volontari te la consegneranno.
                  </Title>
                  <Title level={4}>
                    Iniziamo: Premi il pulsante "Avanti" qui sotto.
                  </Title>
                </div>
              </div>
              <div className="steps-action">
                <Button type="primary" size="large" onClick={() => this.next()}>
                  Avanti
                </Button>
              </div>
            </div>
          )}
          {// STEP 2
          current === 1 && (
            <div>
              <div className="steps-content">
                <div className="centered formdiv">
                  <Title level={2}>Inserisci i tuoi dati:</Title>
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
                </div>
              </div>
              <div className="steps-action">
                <Button type="primary" size="large" onClick={() => this.next()}>
                  Avanti
                </Button>
                <Button
                  style={{ margin: 8 }}
                  size="large"
                  onClick={() => this.prev()}
                >
                  Indietro
                </Button>
              </div>
            </div>
          )}
          {// STEP 3
          current === 2 && !redirect && !error && (
            <div>
              <div className="steps-content">
                <div className="centered">
                  <div className="centered spesadiv">
                    <Title level={2}>Ora scrivi la tua spesa!</Title>
                    <Form
                      labelCol={{ span: 3 }}
                      size="large"
                      name="spesa"
                      onFinish=""
                      onFinishFailed=""
                      onValuesChange={this.valueChanged}
                    >
                      <Form.Item
                        name="spesa"
                        rules={[
                          {
                            required: true,
                            message: "Per favore, inserisci qualcosa!"
                          }
                        ]}
                      >
                        <Input.TextArea
                          allowClear={true}
                          placeholder="Scrivi qui"
                          autoSize={{ minRows: 7, maxRows: 20 }}
                        />
                      </Form.Item>
                    </Form>
                    <Title level={4}>
                      Quando hai finito, premi il pulsante Conferma per inviare
                      l'ordine.
                    </Title>
                  </div>
                </div>
              </div>
              <div className="steps-action">
                <Button
                  type="primary"
                  size="large"
                  onClick={this.formSubmitted}
                >
                  Conferma
                </Button>
                <Button
                  style={{ margin: 8 }}
                  size="large"
                  onClick={() => this.prev()}
                >
                  Indietro
                </Button>
              </div>
            </div>
          )}
          {current === 2 && redirect && (
            <Result
              status="success"
              title="Ordine effettuato correttamente!"
              subTitle="Verrai contattato da un volontario il prima possibile."
              extra={[
                <Link to="/" key={this.state.message.nome}>
                  <Button type="primary" size="large">
                    Va bene
                  </Button>
                </Link>
              ]}
            />
          )}
          {current === 2 && error && (
            <Result
              status="error"
              title="Errore nell'invio"
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
                  C'è stato un errore interno, per favore inserisci nuovamente i
                  dati e riprova. <br />
                  Sei sicuro di aver riempito correttamente tutti i tuoi dati?{" "}
                  <br />
                  Se questo errore persiste, puoi contattarci{" "}
                  <Link
                    to="/contatta"
                    style={{ fontWeight: 600 }}
                    key={this.state.message.nome}
                  >
                    qui
                  </Link>
                  .
                </Text>
              </div>
            </Result>
          )}
        </div>
      </PageLayout>
    );
  }
}
