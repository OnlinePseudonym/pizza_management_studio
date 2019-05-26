defmodule PmsApiWeb.ToppingView do
  use PmsApiWeb, :view
  alias PmsApiWeb.ToppingView

  def render("index.json", %{toppings: toppings}) do
    %{data: render_many(toppings, ToppingView, "topping.json")}
  end

  def render("show.json", %{topping: topping}) do
    %{data: render_one(topping, ToppingView, "topping.json")}
  end

  def render("topping.json", %{topping: topping}) do
    %{
      id: topping.id,
      name: topping.name,
      description: topping.description,
      tag: topping.tag
    }
  end
end
