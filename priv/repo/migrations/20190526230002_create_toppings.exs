defmodule PmsApi.Repo.Migrations.CreateToppings do
  use Ecto.Migration

  def change do
    create table(:toppings) do
      add :name, :string
      add :description, :text
      add :tag, {:array, :string}

      timestamps()
    end

  end
end
