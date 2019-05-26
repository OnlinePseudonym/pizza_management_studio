defmodule PmsApi.Pizzas do
  @moduledoc """
  The Pizzas context.
  """

  import Ecto.Query, warn: false
  alias PmsApi.Repo

  alias PmsApi.Pizzas.Topping

  @doc """
  Returns the list of toppings.

  ## Examples

      iex> list_toppings()
      [%Topping{}, ...]

  """
  def list_toppings do
    Repo.all(Topping)
  end

  @doc """
  Gets a single topping.

  Raises `Ecto.NoResultsError` if the Topping does not exist.

  ## Examples

      iex> get_topping!(123)
      %Topping{}

      iex> get_topping!(456)
      ** (Ecto.NoResultsError)

  """
  def get_topping!(id), do: Repo.get!(Topping, id)

  @doc """
  Creates a topping.

  ## Examples

      iex> create_topping(%{field: value})
      {:ok, %Topping{}}

      iex> create_topping(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_topping(attrs \\ %{}) do
    %Topping{}
    |> Topping.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a topping.

  ## Examples

      iex> update_topping(topping, %{field: new_value})
      {:ok, %Topping{}}

      iex> update_topping(topping, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_topping(%Topping{} = topping, attrs) do
    topping
    |> Topping.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Topping.

  ## Examples

      iex> delete_topping(topping)
      {:ok, %Topping{}}

      iex> delete_topping(topping)
      {:error, %Ecto.Changeset{}}

  """
  def delete_topping(%Topping{} = topping) do
    Repo.delete(topping)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking topping changes.

  ## Examples

      iex> change_topping(topping)
      %Ecto.Changeset{source: %Topping{}}

  """
  def change_topping(%Topping{} = topping) do
    Topping.changeset(topping, %{})
  end

  alias PmsApi.Pizzas.Pizza

  @doc """
  Returns the list of pizzas.

  ## Examples

      iex> list_pizzas()
      [%Pizza{}, ...]

  """
  def list_pizzas do
    Repo.all(Pizza)
  end

  @doc """
  Gets a single pizza.

  Raises `Ecto.NoResultsError` if the Pizza does not exist.

  ## Examples

      iex> get_pizza!(123)
      %Pizza{}

      iex> get_pizza!(456)
      ** (Ecto.NoResultsError)

  """
  def get_pizza!(id), do: Repo.get!(Pizza, id)

  @doc """
  Creates a pizza.

  ## Examples

      iex> create_pizza(%{field: value})
      {:ok, %Pizza{}}

      iex> create_pizza(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_pizza(attrs \\ %{}) do
    %Pizza{}
    |> Pizza.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a pizza.

  ## Examples

      iex> update_pizza(pizza, %{field: new_value})
      {:ok, %Pizza{}}

      iex> update_pizza(pizza, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_pizza(%Pizza{} = pizza, attrs) do
    pizza
    |> Pizza.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Pizza.

  ## Examples

      iex> delete_pizza(pizza)
      {:ok, %Pizza{}}

      iex> delete_pizza(pizza)
      {:error, %Ecto.Changeset{}}

  """
  def delete_pizza(%Pizza{} = pizza) do
    Repo.delete(pizza)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking pizza changes.

  ## Examples

      iex> change_pizza(pizza)
      %Ecto.Changeset{source: %Pizza{}}

  """
  def change_pizza(%Pizza{} = pizza) do
    Pizza.changeset(pizza, %{})
  end
end
