const userService = {
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

async function deleteUser(id) {
  const res = await fetch(`${api_root}/users/${id}`, requestOptions('DELETE'));
  return res;
}

async function createUser(params) {
  const res = await fetch(`${api_root}/users`, requestOptions('POST', params));
  return await res.json();
}

async function getUser(id) {
  const res = await fetch(`${api_root}/users/${id}`, requestOptions('GET'));
  return await res.json();
}

async function getUsers() {
  const res = await fetch(`${api_root}/users`, requestOptions('GET'));
  return await res.json();
}

async function updateUser(id, params) {
  const res = await fetch(`${api_root}/users/${id}`, requestOptions('PUT', params));
  return await res.json();
}

export default userService;
