defmodule PmsApi.Repo.Migrations.CreatePizzas do
  use Ecto.Migration

  def change do
    create table(:pizzas) do
      add :name, :string
      add :description, :text
      add :toppings, {:array, :integer}

      timestamps()
    end

  end
end
