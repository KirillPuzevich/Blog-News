import { urlApi } from "../serviceWorkerRegistration";

export const createSportPost = (data) => {
    const URL = `${urlApi}api/sport-news`;
  
    const options = {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
    };
  
    return fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };