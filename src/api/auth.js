export const fetchToken = (values) => {
  const URL = "https://studapi.teachmeskills.by/auth/jwt/create/";

  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
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
      if (response.data && response.data.access && response.data.refresh) {
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('isAuth', true);
        return { access: response.data.access, refresh: response.data.refresh, status: response.status }; 
      }
      return { status: response.status };
    })
    .catch((e) => {
      localStorage.setItem('isAuth', false);
      return { status: 500 }; 
    });
};


export const fetchUserActivation = (uid, token) => {
    const URL = "https://studapi.teachmeskills.by/auth/users/activation/";
    const data = { uid, token };

    fetch(URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      });
}