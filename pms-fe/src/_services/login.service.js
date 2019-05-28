export const loginService = { login, logout };

async function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  };

  const response = await fetch('http://localhost:4000/api/users/sign_in', requestOptions);
  const user = await handleResponse(response);

  if (user) {
    user.authdata = window.btoa(`${email}:${password}`);
    localStorage.setItem('user', JSON.stringify(user));
  }

  return user;
}

function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        //window.location.assign('/');
      }

      const error = (data && data.errors.detail) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
