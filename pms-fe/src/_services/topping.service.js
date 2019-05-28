const toppingService = {
  createTopping,
  deleteTopping,
  getTopping,
  getToppings,
  updateTopping
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
    options.body = JSON.stringify({ topping: params });
  }

  return options;
}

async function deleteTopping(id) {
  const res = await fetch(`${api_root}/toppings/${id}`, requestOptions('DELETE'));
  return res;
}

async function createTopping(params) {
  const res = await fetch(`${api_root}/toppings`, requestOptions('POST', params));
  return await res.json();
}

async function getTopping(id) {
  const res = await fetch(`${api_root}/toppings/${id}`, requestOptions('GET'));
  return await res.json();
}

async function getToppings() {
  const res = await fetch(`${api_root}/toppings`, requestOptions('GET'));
  return await res.json();
}

async function updateTopping(id, params) {
  const res = await fetch(`${api_root}/toppings/${id}`, requestOptions('PUT', params));
  return await res.json();
}

export default toppingService;
