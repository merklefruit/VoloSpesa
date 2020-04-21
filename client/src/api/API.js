const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/messages"
    : "http://api.volospesa.org/api/v1/messages";

// RIFARE TUTTO CON ASYNC AWAIT

export function getMessages() {
  return fetch(API_URL)
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
  const ORDER_URL = API_URL + "/" + id;
  return fetch(ORDER_URL)
    .then(res => res.json())
    .then(messages => {
      return messages;
    });
}

export function getLocation() {
  if (!navigator.geolocation) {
    console.log("NON HO I PERMESSI!!!");
  }
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("ECCO LA POSIZIONE");
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {},
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
    const response = await fetch(API_URL, {
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
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(message)
  });
  return response.status;
}
