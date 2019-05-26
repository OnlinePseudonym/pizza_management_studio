defmodule PmsApiWeb.PizzaController do
  use PmsApiWeb, :controller

  alias PmsApi.Pizzas
  alias PmsApi.Pizzas.Pizza

  action_fallback PmsApiWeb.FallbackController

  def index(conn, _params) do
    pizzas = Pizzas.list_pizzas()
    render(conn, "index.json", pizzas: pizzas)
  end

  def create(conn, %{"pizza" => pizza_params}) do
    with {:ok, %Pizza{} = pizza} <- Pizzas.create_pizza(pizza_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.pizza_path(conn, :show, pizza))
      |> render("show.json", pizza: pizza)
    end
  end

  def show(conn, %{"id" => id}) do
    pizza = Pizzas.get_pizza!(id)
    render(conn, "show.json", pizza: pizza)
  end

  def update(conn, %{"id" => id, "pizza" => pizza_params}) do
    pizza = Pizzas.get_pizza!(id)

    with {:ok, %Pizza{} = pizza} <- Pizzas.update_pizza(pizza, pizza_params) do
      render(conn, "show.json", pizza: pizza)
    end
  end

  def delete(conn, %{"id" => id}) do
    pizza = Pizzas.get_pizza!(id)

    with {:ok, %Pizza{}} <- Pizzas.delete_pizza(pizza) do
      send_resp(conn, :no_content, "")
    end
  end
end
