defmodule PmsApi.Repo do
  use Ecto.Repo,
    otp_app: :pms_api,
    adapter: Ecto.Adapters.Postgres
end
