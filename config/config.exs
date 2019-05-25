# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :pms_api,
  ecto_repos: [PmsApi.Repo]

# Configures the endpoint
config :pms_api, PmsApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ICdog31RJBsy48fhqcdMHB+bbM3nGH+2J+DhETkmEXKq1OthCper5gqq8NkKGfiF",
  render_errors: [view: PmsApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: PmsApi.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
