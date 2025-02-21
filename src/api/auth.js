import { urlApi } from "../serviceWorkerRegistration";

export const fetchToken = (values) => {
  const URL = `${urlApi}auth/login`;

  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => ({
          status: response.status,
          data: data,
        }));
      }
      return { status: response.status, data: null };
    })
    .then((response) => {
      if (response.data && response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('role', response.data.role);

        return { access: response.data.token, status: response.status };
      }
      return { status: response.status };
    })
    .catch((e) => {
      localStorage.setItem('isAuth', 'false');
      return { status: 500 };
    });
};