defmodule PmsApiWeb.PizzaView do
  use PmsApiWeb, :view
  alias PmsApiWeb.PizzaView

  def render("index.json", %{pizzas: pizzas}) do
    %{data: render_many(pizzas, PizzaView, "pizza.json")}
  end

  def render("show.json", %{pizza: pizza}) do
    %{data: render_one(pizza, PizzaView, "pizza.json")}
  end

  def render("pizza.json", %{pizza: pizza}) do
    %{id: pizza.id,
      name: pizza.name,
      description: pizza.description,
      toppings: pizza.toppings}
  end
end
