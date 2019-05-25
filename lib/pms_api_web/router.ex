defmodule PmsApiWeb.Router do
  use PmsApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", PmsApiWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
  end
end
