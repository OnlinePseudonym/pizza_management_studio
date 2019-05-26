defmodule PmsApi.PizzasTest do
  use PmsApi.DataCase

  alias PmsApi.Pizzas

  describe "toppings" do
    alias PmsApi.Pizzas.Topping

    @valid_attrs %{description: "some description", name: "some name", tag: []}
    @update_attrs %{description: "some updated description", name: "some updated name", tag: []}
    @invalid_attrs %{description: nil, name: nil, tag: nil}

    def topping_fixture(attrs \\ %{}) do
      {:ok, topping} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Pizzas.create_topping()

      topping
    end

    test "list_toppings/0 returns all toppings" do
      topping = topping_fixture()
      assert Pizzas.list_toppings() == [topping]
    end

    test "get_topping!/1 returns the topping with given id" do
      topping = topping_fixture()
      assert Pizzas.get_topping!(topping.id) == topping
    end

    test "create_topping/1 with valid data creates a topping" do
      assert {:ok, %Topping{} = topping} = Pizzas.create_topping(@valid_attrs)
      assert topping.description == "some description"
      assert topping.name == "some name"
      assert topping.tag == []
    end

    test "create_topping/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Pizzas.create_topping(@invalid_attrs)
    end

    test "update_topping/2 with valid data updates the topping" do
      topping = topping_fixture()
      assert {:ok, %Topping{} = topping} = Pizzas.update_topping(topping, @update_attrs)
      assert topping.description == "some updated description"
      assert topping.name == "some updated name"
      assert topping.tag == []
    end

    test "update_topping/2 with invalid data returns error changeset" do
      topping = topping_fixture()
      assert {:error, %Ecto.Changeset{}} = Pizzas.update_topping(topping, @invalid_attrs)
      assert topping == Pizzas.get_topping!(topping.id)
    end

    test "delete_topping/1 deletes the topping" do
      topping = topping_fixture()
      assert {:ok, %Topping{}} = Pizzas.delete_topping(topping)
      assert_raise Ecto.NoResultsError, fn -> Pizzas.get_topping!(topping.id) end
    end

    test "change_topping/1 returns a topping changeset" do
      topping = topping_fixture()
      assert %Ecto.Changeset{} = Pizzas.change_topping(topping)
    end
  end

  describe "pizzas" do
    alias PmsApi.Pizzas.Pizza

    @valid_attrs %{description: "some description", name: "some name", toppings: []}
    @update_attrs %{description: "some updated description", name: "some updated name", toppings: []}
    @invalid_attrs %{description: nil, name: nil, toppings: nil}

    def pizza_fixture(attrs \\ %{}) do
      {:ok, pizza} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Pizzas.create_pizza()

      pizza
    end

    test "list_pizzas/0 returns all pizzas" do
      pizza = pizza_fixture()
      assert Pizzas.list_pizzas() == [pizza]
    end

    test "get_pizza!/1 returns the pizza with given id" do
      pizza = pizza_fixture()
      assert Pizzas.get_pizza!(pizza.id) == pizza
    end

    test "create_pizza/1 with valid data creates a pizza" do
      assert {:ok, %Pizza{} = pizza} = Pizzas.create_pizza(@valid_attrs)
      assert pizza.description == "some description"
      assert pizza.name == "some name"
      assert pizza.toppings == []
    end

    test "create_pizza/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Pizzas.create_pizza(@invalid_attrs)
    end

    test "update_pizza/2 with valid data updates the pizza" do
      pizza = pizza_fixture()
      assert {:ok, %Pizza{} = pizza} = Pizzas.update_pizza(pizza, @update_attrs)
      assert pizza.description == "some updated description"
      assert pizza.name == "some updated name"
      assert pizza.toppings == []
    end

    test "update_pizza/2 with invalid data returns error changeset" do
      pizza = pizza_fixture()
      assert {:error, %Ecto.Changeset{}} = Pizzas.update_pizza(pizza, @invalid_attrs)
      assert pizza == Pizzas.get_pizza!(pizza.id)
    end

    test "delete_pizza/1 deletes the pizza" do
      pizza = pizza_fixture()
      assert {:ok, %Pizza{}} = Pizzas.delete_pizza(pizza)
      assert_raise Ecto.NoResultsError, fn -> Pizzas.get_pizza!(pizza.id) end
    end

    test "change_pizza/1 returns a pizza changeset" do
      pizza = pizza_fixture()
      assert %Ecto.Changeset{} = Pizzas.change_pizza(pizza)
    end
  end
end
