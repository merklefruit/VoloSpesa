import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Carousel, Typography, Card, Button } from "antd";

import "./home.css";
import PageLayout from "../../components/Layout/PageLayout";

const { Title, Text } = Typography;

export default class Home extends Component {
  render() {
    return (
      <PageLayout>
        <section className="carousel">
          <Carousel autoplay>
            <div className="slide slide1"></div>
            <div className="slide slide2"></div>
            <div className="slide slide3"></div>
            <div className="slide slide4"></div>
          </Carousel>
        </section>
        <section className="features">
          <div className="features-div">
            <Title level={2}>Ordina la spesa a casa tua</Title>
            <Link to="/lista">
              <button className="faiunordine">Fai un ordine</button>
            </Link>
          </div>

          <div style={{ marginTop: 20 }}>
            <Card className="card">
              <div className="card-text">
                <Title level={3}>Scopri come funziona</Title>
                <Text>
                  Se hai <strong>difficoltà nell'uscire</strong> a fare la
                  spesa, oppure devi rimanere a casa a causa dell'emergenza
                  Covid-19, puoi usufruire di VoloSpesa per ordinare la spesa a
                  casa tua, in modo che <strong>dei volontari</strong> ti
                  contattino e possano consegnartela.
                </Text>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: 20 }}>
            <Card className="card">
              <div className="card-text">
                <Title level={3}>Semplicissimo da usare</Title>
                <Text>
                  VoloSpesa nasce per essere il più <strong>facile</strong>{" "}
                  possibile <strong>per tutti</strong>. Per iniziare, ti basta
                  premere sul pulsante "Fai un ordine" e in pochi click potrai
                  confermarlo.
                </Text>
              </div>
            </Card>
          </div>
          <div className="features-div">
            <Title level={2}>Sei un volontario?</Title>
            <div className="card-text card" style={{ marginBottom: 15 }}>
              <Text>
                Se vuoi aiutare la tua comunità locale facendo il volontario,
                puoi consultare la mappa in cui appaiono tutte le richieste di
                spesa. Se ne trovi una abbastanza vicina a casa tua, mettiti in
                contatto tramite telefono con chi l'ha richiesta.
              </Text>
            </div>
            <Link to="/mappa">
              <Button type="primary" size="large">
                Vai alla mappa
              </Button>
            </Link>
            <div className="card-text card" style={{ marginTop: 15 }}>
              <Text strong>
                Per favore rispetta le linee guida igieniche della tua città.
                <br />
                La loro mancata adesione potrebbe potenzialmente mettere a
                rischio la tua vita e quella di altri individui.
              </Text>
            </div>
          </div>
        </section>
      </PageLayout>
    );
  }
}
