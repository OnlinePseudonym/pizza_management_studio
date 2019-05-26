defmodule PmsApiWeb.ToppingController do
  use PmsApiWeb, :controller

  alias PmsApi.Pizzas
  alias PmsApi.Pizzas.Topping

  action_fallback PmsApiWeb.FallbackController

  def index(conn, _params) do
    toppings = Pizzas.list_toppings()
    render(conn, "index.json", toppings: toppings)
  end

  def create(conn, %{"topping" => topping_params}) do
    with {:ok, %Topping{} = topping} <- Pizzas.create_topping(topping_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.topping_path(conn, :show, topping))
      |> render("show.json", topping: topping)
    end
  end

  def show(conn, %{"id" => id}) do
    topping = Pizzas.get_topping!(id)
    render(conn, "show.json", topping: topping)
  end

  def update(conn, %{"id" => id, "topping" => topping_params}) do
    topping = Pizzas.get_topping!(id)

    with {:ok, %Topping{} = topping} <- Pizzas.update_topping(topping, topping_params) do
      render(conn, "show.json", topping: topping)
    end
  end

  def delete(conn, %{"id" => id}) do
    topping = Pizzas.get_topping!(id)

    with {:ok, %Topping{}} <- Pizzas.delete_topping(topping) do
      send_resp(conn, :no_content, "")
    end
  end
end
