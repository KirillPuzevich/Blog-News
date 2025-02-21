import { urlApi } from "../serviceWorkerRegistration";

export const createEntertainmentPost = (data) => {
    const URL = `${urlApi}api/entertainment-news`;
  
    const options = {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json", // Устанавливаем Content-Type как application/json
      },
      body: JSON.stringify(data), // Преобразуем объект в JSON
    };
  
    return fetch(URL, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  };