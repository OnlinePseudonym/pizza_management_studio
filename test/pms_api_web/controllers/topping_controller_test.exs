defmodule PmsApiWeb.ToppingControllerTest do
  use PmsApiWeb.ConnCase

  alias PmsApi.Pizzas
  alias PmsApi.Pizzas.Topping
  alias PmsApi.Auth
  alias Plug.Test

  @create_attrs %{
    description: "some description",
    name: "some name",
    tag: []
  }
  @update_attrs %{
    description: "some updated description",
    name: "some updated name",
    tag: []
  }
  @invalid_attrs %{description: nil, name: nil, tag: nil}
  @current_user_attrs %{
    email: "some current user email",
    is_active: true,
    is_manager: true,
    password: "some current user password"
  }

  def fixture(:topping) do
    {:ok, topping} = Pizzas.create_topping(@create_attrs)
    topping
  end

  def fixture(:current_user) do
    {:ok, current_user} = Auth.create_user(@current_user_attrs)
    current_user
  end

  setup %{conn: conn} do
    {:ok, conn: conn, current_user: current_user} = setup_current_user(conn)
    {:ok, conn: put_req_header(conn, "accept", "application/json"), current_user: current_user}
  end

  describe "index" do
    test "lists all toppings", %{conn: conn} do
      conn = get(conn, Routes.topping_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create topping" do
    test "renders topping when data is valid", %{conn: conn} do
      conn = post(conn, Routes.topping_path(conn, :create), topping: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.topping_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "name" => "some name",
               "tag" => []
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.topping_path(conn, :create), topping: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update topping" do
    setup [:create_topping]

    test "renders topping when data is valid", %{conn: conn, topping: %Topping{id: id} = topping} do
      conn = put(conn, Routes.topping_path(conn, :update, topping), topping: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.topping_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "name" => "some updated name",
               "tag" => []
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, topping: topping} do
      conn = put(conn, Routes.topping_path(conn, :update, topping), topping: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete topping" do
    setup [:create_topping]

    test "deletes chosen topping", %{conn: conn, topping: topping} do
      conn = delete(conn, Routes.topping_path(conn, :delete, topping))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.topping_path(conn, :show, topping))
      end
    end
  end

  defp create_topping(_) do
    topping = fixture(:topping)
    {:ok, topping: topping}
  end

  defp setup_current_user(conn) do
    current_user = fixture(:current_user)

    {:ok,
      conn: Test.init_test_session(conn, current_user_id: current_user.id),
      current_user: current_user}
  end
end
