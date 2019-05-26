defmodule PmsApi.Pizzas.Pizza do
  use Ecto.Schema
  import Ecto.Changeset

  schema "pizzas" do
    field :description, :string
    field :name, :string
    field :toppings, {:array, :integer}

    timestamps()
  end

  @doc false
  def changeset(pizza, attrs) do
    pizza
    |> cast(attrs, [:name, :description, :toppings])
    |> validate_required([:name, :description, :toppings])
  end
end
