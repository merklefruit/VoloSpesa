// const API_URL = "https://api.volospesa.org/api/v1";

// LASCIARE SOLO IN DEVELOPMENT
// DA USARE SOLO SE SI APPORTANO CAMBIAMENTI AL BACKEND:
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "https://api.volospesa.org/api/v1";

// GENERAL ROUTE PATHS:

const messageURL = API_URL + "/messages";
const userURL = API_URL + "/users";

// *************************************
//  MESSAGE ROUTES

// @GET /messages
// -> lista degli utenti che hanno fatto richiesta
export function getMessages() {
  return fetch(messageURL)
    .then(res => res.json())
    .then(messages => {
      const haveSeenLocation = {};
      return messages.reduce((all, message) => {
        const key = `${message.latitudine.toFixed(
          4
        )}${message.longitudine.toFixed(4)}`;
        haveSeenLocation[key] = message;
        all.push(message);
        return all;
      }, []);
    });
}

// @GET /messages/:id
// -> singolo messaggio con parametro id
export function getMessage(id) {
  const ORDER_URL = messageURL + "/" + id;
  return fetch(ORDER_URL)
    .then(res => res.json())
    .then(messages => {
      return messages;
    });
}

// @POST /messages
// -> aggiunge un messaggio ai richiedenti
export async function sendMessage(message) {
  try {
    const response = await fetch(messageURL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(message)
    });
    return response.status;
  } catch (err) {
    console.log(err);
    return 400;
  }
}

// @DELETE /messages (req.body)
// -> cancella un messaggio dai richiedenti
export async function deleteMessage(message) {
  const response = await fetch(messageURL, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(message)
  });
  return response.status;
}

// *******************************************
//  USER ROUTES

// @GET /users
// -> lista dei volontari
export function getUsers(id) {
  return fetch(userURL)
    .then(res => res.json())
    .then(users => {
      return users;
    });
}

// @GET /users/:id
// -> singolo volontario con parametro id
export function getUser(id) {
  const USER_URL = userURL + "/" + id;
  return fetch(USER_URL)
    .then(res => res.json())
    .then(user => {
      return user;
    });
}

// @POST /users
// -> aggiunge un volontario
export async function addUser(user) {
  try {
    const response = await fetch(userURL, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    });
    return response.status;
  } catch (err) {
    console.log(err);
    return 400;
  }
}

// @DELETE /users (req.body)
// -> cancella un volontario
export async function deleteUser(user) {
  const response = await fetch(userURL, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });
  return response.status;
}

// ***************************************
//  EXTERNAL APIs

// @GET (esterno)
// -> trova la posizione del client
export function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        reject();
      },
      // IPAPI API ha dei problemi su alcuni device mostra posizioni
      // del tutto inattendibili ed è stato rimosso.
      // () => {
      //   resolve(
      //     fetch("https://ipapi.co/json")
      //       .then(res => res.json())
      //       .then(location => {
      //         return {
      //           lat: location.latitude,
      //           lng: location.longitude
      //         };
      //       })
      //   );
      // },
      { timeout: 10000, enableHighAccuracy: false }
    );
  });
}
