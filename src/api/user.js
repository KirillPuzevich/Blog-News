import { urlApi } from "../serviceWorkerRegistration";
export const fetchUserInfo = (navigate) => {
  const URL = `${urlApi}api/me`;
  const token = localStorage.getItem('accessToken');

  const options = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };

  return fetch(URL, options)
      .then((response) => {
          if (response.status === 401) {
              // Если токен недействителен, перенаправляем пользователя на страницу входа
              localStorage.setItem('isAuth', false);
              navigate('/login'); // Предполагается, что у вас есть страница входа
              throw new Error('Unauthorized');
          }
          return response.json();
      })
      .catch((e) => {
          console.error(e);
          return { error: e.message }; // Возвращаем ошибку для дальнейшей обработки
      });
};

// export const refreshToken = (receivedUrl, navigate, options) => {
//   const URL = "https://studapi.teachmeskills.by/auth/jwt/refresh/";

//   const token = localStorage.getItem('refreshToken');

//   return fetch(URL, {
//     method: "POST",
//     body: JSON.stringify({refresh: token}),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then( async(response) => {

//       if(response.status === 401){
//         localStorage.setItem('isAuth', false);
//         if (navigate) {
//           navigate("/login");
//           console.log(navigate)
//         } else {
//           window.location.href = window.location.origin + "/login";
//         }

//         return null;
//       }
//       const token = await response.json()

//       localStorage.setItem('accessToken', token.access);

//       return fetch(receivedUrl, {
//         ...options,
//         headers: {
//           ...options.headers,
//           Authorization: `Bearer ${token.access}`,
//         },
//       }).then((res) => res.json());

//   })

//     .catch((e) => console.log(e));

// }