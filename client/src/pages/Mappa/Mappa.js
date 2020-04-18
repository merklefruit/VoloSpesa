import React, { Component } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { getMessages, getLocation } from "../../api/API";
import { Spin, Drawer, Button, Typography, message } from "antd";

import "./mappa.css";
import sitmarker from "../../static/img/sitmarker.png";
import bluedot from "../../static/svg/bluedot.svg";
import HomeButton from "../../components/MapUI/HomeButton";
import OrderButton from "../../components/MapUI/OrderButton";
import ContactButton from "../../components/MapUI/ContactButton";

const { Text } = Typography;

const SitMarker = L.icon({
  iconUrl: sitmarker,
  iconSize: [55, 67],
  iconAnchor: [30, 67],
  popupAnchor: [-3, -57]
});

const myLocationIcon = L.icon({
  iconUrl: bluedot,
  iconSize: [14, 14],
  iconAnchor: [7, 0]
});

export default class Mappa extends Component {
  state = {
    location: {
      lat: 45,
      lng: 9
    },
    gotLocation: false,
    zoom: 9,
    messages: [],
    loaded: false,
    visible: false,
    drawerContent: {}
  };

  componentDidMount() {
    getMessages().then(messages => {
      this.setState(prevState => ({
        ...prevState,
        messages: messages,
        loaded: true
      }));
      this.geolocate();
    });
  }

  geolocate = () => {
    message.loading({
      content: "Ricerca posizione...",
      key: "loc-search",
      duration: 11
    });
    getLocation()
      .then(position => {
        message.success({
          content: "Posizione trovata!",
          key: "loc-search",
          duration: 2
        });
        this.setState(prevState => ({
          ...prevState,
          location: {
            lat: position.lat,
            lng: position.lng
          },
          zoom: 13,
          gotLocation: true
        }));
      })
      .catch(() => {
        message.error({
          content: "Non ho i permessi per la tua posizione...",
          key: "loc-search",
          duration: 7
        });
        message.info({
          content: "Ti sto posizionando su Milano.",
          duration: 7
        });
        this.setState(prevState => ({
          ...prevState,
          location: {
            lat: 45.464211,
            lng: 9.191383
          },
          zoom: 13,
          gotLocation: true
        }));
      });
  };

  showDrawer = message => {
    this.setState(prevState => ({
      ...prevState,
      drawerContent: message,
      visible: true
    }));
  };

  onClose = () => {
    this.setState(prevState => ({
      ...prevState,
      drawerContent: {},
      visible: false
    }));
  };

  render() {
    const initialPosition = [this.state.location.lat, this.state.location.lng];
    return (
      <div>
        <HomeButton />
        <OrderButton />
        <ContactButton />
        {this.state.loaded ? (
          <div>
            <Map
              animate={true}
              useFlyTo={true}
              className="map"
              center={initialPosition}
              zoom={this.state.zoom}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.state.gotLocation && (
                <Marker position={initialPosition} icon={myLocationIcon}>
                  <Popup>
                    <Text strong>Ti trovi qui</Text>
                  </Popup>
                </Marker>
              )}
              {this.state.messages.map(message => (
                <div key={message._id}>
                  <Marker
                    position={[message.latitudine, message.longitudine]}
                    icon={SitMarker}
                  >
                    <Popup>
                      <Text strong>Nome: </Text>
                      <span>{message.nome}</span>
                      <br />
                      <Text strong>Indirizzo: </Text>
                      {message.indirizzo}
                      <br />
                      <div className="buttondiv">
                        <Button
                          size="small"
                          className="moreinfo"
                          type="primary"
                          onClick={() => this.showDrawer(message)}
                        >
                          Contatta
                        </Button>
                      </div>
                    </Popup>
                  </Marker>
                </div>
              ))}
            </Map>
            {/* DRAWER */}
            {this.state.visible && (
              <Drawer
                key={this.state.drawerContent._id}
                title={"Spesa di: " + this.state.drawerContent.nome}
                placement="bottom"
                closable={true}
                height="350"
                onClose={this.onClose}
                visible={this.state.visible}
              >
                <div className="info-drawer">
                  <Text strong>Indirizzo: </Text>
                  <Text>{this.state.drawerContent.indirizzo}</Text>
                  <br />
                  <Text strong>Telefono: </Text>
                  <Text>{this.state.drawerContent.telefono}</Text>
                  <br />
                  <Text strong>Spesa: </Text>
                  <Text>{this.state.drawerContent.spesa}</Text>
                  <div className="consegnala-div">
                    <Link to={"/consegna/" + this.state.drawerContent._id}>
                      <Button type="primary">Consegnala</Button>
                    </Link>
                    <Button style={{ marginLeft: 10 }} onClick={this.onClose}>
                      Chiudi
                    </Button>
                  </div>
                </div>
              </Drawer>
            )}
          </div>
        ) : (
          <div className="loadingdiv">
            <Spin size="large" tip="Caricamento..." />
          </div>
        )}
      </div>
    );
  }
}
