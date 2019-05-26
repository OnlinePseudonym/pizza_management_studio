defmodule PmsApiWeb.PizzaControllerTest do
  use PmsApiWeb.ConnCase

  alias PmsApi.Pizzas
  alias PmsApi.Pizzas.Pizza
  alias PmsApi.Auth
  alias Plug.Test

  @create_attrs %{
    description: "some description",
    name: "some name",
    toppings: []
  }
  @update_attrs %{
    description: "some updated description",
    name: "some updated name",
    toppings: []
  }
  @invalid_attrs %{description: nil, name: nil, toppings: nil}
  @current_user_attrs %{
    email: "some current user email",
    is_active: true,
    is_manager: true,
    password: "some current user password"
  }

  def fixture(:pizza) do
    {:ok, pizza} = Pizzas.create_pizza(@create_attrs)
    pizza
  end

  def fixture(:current_user) do
    {:ok, current_user} = Auth.create_user(@current_user_attrs)
    current_user
  end

  setup %{conn: conn} do
    {:ok, conn: conn, current_user: current_user} = setup_current_user(conn)
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all pizzas", %{conn: conn} do
      conn = get(conn, Routes.pizza_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create pizza" do
    test "renders pizza when data is valid", %{conn: conn} do
      conn = post(conn, Routes.pizza_path(conn, :create), pizza: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.pizza_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "name" => "some name",
               "toppings" => []
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.pizza_path(conn, :create), pizza: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update pizza" do
    setup [:create_pizza]

    test "renders pizza when data is valid", %{conn: conn, pizza: %Pizza{id: id} = pizza} do
      conn = put(conn, Routes.pizza_path(conn, :update, pizza), pizza: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.pizza_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "name" => "some updated name",
               "toppings" => []
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, pizza: pizza} do
      conn = put(conn, Routes.pizza_path(conn, :update, pizza), pizza: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete pizza" do
    setup [:create_pizza]

    test "deletes chosen pizza", %{conn: conn, pizza: pizza} do
      conn = delete(conn, Routes.pizza_path(conn, :delete, pizza))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.pizza_path(conn, :show, pizza))
      end
    end
  end

  defp create_pizza(_) do
    pizza = fixture(:pizza)
    {:ok, pizza: pizza}
  end

  defp setup_current_user(conn) do
    current_user = fixture(:current_user)

    {:ok,
      conn: Test.init_test_session(conn, current_user_id: current_user.id),
      current_user: current_user}
  end
end
