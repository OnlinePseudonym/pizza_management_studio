defmodule PmsApiWeb.UserView do
  use PmsApiWeb, :view
  alias PmsApiWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      is_active: user.is_active,
      is_manager: user.is_manager}
  end
end
