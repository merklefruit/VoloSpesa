// const API_URL = "http://api.volospesa.org/api/v1";

// LASCIARE SOLO IN DEVELOPMENT
// DA USARE SOLO SE SI APPORTANO CAMBIAMENTI AL BACKEND:
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1"
    : "http://api.volospesa.org/api/v1";

// RIFARE TUTTO CON ASYNC AWAIT

const messageURL = API_URL + "/messages";
const userURL = API_URL + "/users";

// MESSAGES FUNCTIONS

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

export function getMessage(id) {
  const ORDER_URL = messageURL + "/" + id;
  return fetch(ORDER_URL)
    .then(res => res.json())
    .then(messages => {
      return messages;
    });
}

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
