import React from "react";
import { Typography, Collapse, Card, Divider, Button } from "antd";
import PageLayout from "../../components/Layout/PageLayout";

import "./contatta.css";

const { Title, Text } = Typography;
const { Panel } = Collapse;

function Contatta() {
  return (
    <PageLayout>
      <div>
        <Title level={1} className="center">
          Contattaci
        </Title>
        <Card className="center card">
          <Text className="lead">
            VoloSpesa è stato creato da due studenti di ingegneria del
            Politecnico di Milano,{" "}
            <a
              href="https://www.linkedin.com/in/nicolas-racchi"
              rel="noopener noreferrer"
              target="_blank"
            >
              Nicolas Racchi
            </a>{" "}
            e{" "}
            <a
              href="https://www.linkedin.com/in/andrea-carotti-09150218a/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Andrea Carotti
            </a>
            , durante il lockdown dovuto al COVID-19. <br />
          </Text>
        </Card>
        <p style={{ marginTop: "18px" }} />
        <div className="center">
          <a href="mailto:nicksmavic@gmail.com">
            <Button type="primary" size="large">
              Mandaci una mail
            </Button>
          </a>
        </div>

        <p style={{ marginTop: "25px" }} />
        <Title level={3} className="center">
          FAQ
        </Title>

        <Collapse accordion className="card lead-2">
          <Panel header="Perché VoloSpesa?">
            <Text>
              La particolarità di Volospesa è la sua semplicità di utilizzo.
              <Divider />
              Comprendiamo che per una persona con poca domestichezza nell'uso
              di computer, effettuare un ordine possa risultare difficile o
              talvolta impossibile. Volospesa nasce con l'intento di permettere
              a TUTTE le persone con impedimenti fisici o di età di ottenere
              l'aiuto da parte di volontari.
              <Divider />
              Inoltre, pensiamo che VoloSpesa possa essere utile per i
              volontari, i quali hanno così un modo facile per capire se
              qualcuno nelle vicinanze ha inoltrato una richiesta di aiuto.
            </Text>
          </Panel>
          <Panel header="Da dove nasce l'idea?">
            <Text>
              Ci siamo chiesti quale fosse il modo in cui potessimo avere il
              maggiore impatto per aiutare in questa crisi, quindi ci siamo
              mobilitati per trovare risorse e idee che potessero essere utili.
              <Divider />
              Abbiamo contattato amici e conoscenti che fanno servizi di
              volontariato in questo ambito ed è emerso come effettivamente
              l'organizzazione di tali servizi potrebbe usufruire di un
              miglioramento logistico.
            </Text>
          </Panel>
          <Panel header="Salvate i dati personali?">
            <Text>
              In questo momento i dati personali di coloro che fanno una
              richiesta vengono salvati nel nostro database, finché l'ordine non
              viene accettato da un volontario. Quando ciò accade, tutti i dati
              vengono eliminati dal nostro server. Non conserviano nessun dato
              di un ordine già consegnato.
              <Divider />
              Stiamo lavorando su un modo per censurare il numero di telefono
              dei richiedenti usando proxy o un semplice inoltro tramite
              software di terzi, ma queste opzioni risultano costose, e questa
              iniziativa è realizzata con un budget veramente ristretto, usando
              dove possibile librerie e risorse open source
            </Text>
          </Panel>
          <Panel header="È a pagamento?">
            <Text>
              Ovviamente VoloSpesa è gratis sia per chi vuole fare una
              richiesta, sia per i volontari. VoloSpesa è 100% non-profit.
            </Text>
          </Panel>
        </Collapse>

        <p style={{ marginTop: "25px" }} />
        <div className="center">
          <Title level={3}>Stack:</Title>
        </div>
        <Card className="card center">
          <Text className="lead-2">
            Leaflet - Ant Design - ReactJS - NodeJS - Express - GMaps API -
            MongoDB
          </Text>
        </Card>
      </div>
    </PageLayout>
  );
}

export default Contatta;
