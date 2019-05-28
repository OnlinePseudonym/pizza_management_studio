const pizzaService = {
  createPizza,
  deletePizza,
  getPizza,
  getPizzas,
  updatePizza
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
    options.body = JSON.stringify({ pizza: params });
  }

  return options;
}

async function deletePizza(id) {
  const res = await fetch(`${api_root}/pizzas/${id}`, requestOptions('DELETE'));
  return res;
}

async function createPizza(params) {
  const res = await fetch(`${api_root}/pizzas`, requestOptions('POST', params));
  return await res.json();
}

async function getPizza(id) {
  const res = await fetch(`${api_root}/pizzas/${id}`, requestOptions('GET'));
  return await res.json();
}

async function getPizzas() {
  const res = await fetch(`${api_root}/pizzas`, requestOptions('GET'));
  return await res.json();
}

async function updatePizza(id, params) {
  const res = await fetch(`${api_root}/pizzas/${id}`, requestOptions('PUT', params));
  return await res.json();
}

export default pizzaService;
