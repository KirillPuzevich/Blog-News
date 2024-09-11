export const fetchToken = (values) => {
    const URL = "https://studapi.teachmeskills.by/auth/jwt/create/";

     return  fetch(URL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((response) => {
            console.log(response)
            if(response.access && response.refresh){
                localStorage.setItem('accessToken', response.access);
                localStorage.setItem('refreshToken', response.refresh);
                localStorage.setItem('isAuth', true);
                return { access: response.access, refresh: response.refresh }; 
              }
              return null; 
        })
        .catch((e) => {
          localStorage.setItem('isAuth', false);
        });
}

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