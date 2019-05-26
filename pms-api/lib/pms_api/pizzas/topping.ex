defmodule PmsApi.Pizzas.Topping do
  use Ecto.Schema
  import Ecto.Changeset

  schema "toppings" do
    field :description, :string
    field :name, :string
    field :tag, {:array, :string}

    timestamps()
  end

  @doc false
  def changeset(topping, attrs) do
    topping
    |> cast(attrs, [:name, :description, :tag])
    |> validate_required([:name, :description, :tag])
  end
end
