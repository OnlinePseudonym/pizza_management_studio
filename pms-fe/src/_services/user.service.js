export const userService = {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
};

const api_root = 'http://localhost:4000/api';

function requestOptions(method, params) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  if (params) {
    options.body = JSON.stringify({ user: params });
  }

  return options;
}

function deleteUser(id) {
  return fetch(`${api_root}/users/${id}`, requestOptions('DELETE')).then(res => res);
}

function createUser(params) {
  return fetch(`${api_root}/users`, requestOptions('POST', params)).then(res => res.json());
}

function getUser(id) {
  return fetch(`${api_root}/users/${id}`, requestOptions('GET')).then(res => res.json());
}

function getUsers() {
  return fetch(`${api_root}/users`, requestOptions('GET')).then(res => res.json());
}

function updateUser(id, params) {
  return fetch(`${api_root}/users/${id}`, requestOptions('PUT', params)).then(res => res.json());
}
