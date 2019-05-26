use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :pms_api, PmsApiWeb.Endpoint,
  secret_key_base: "u9ibQLf3XP5OFYz+MiwxuLD7sKLAy5R64Reo37Uto1+xOWYl6hzDrh2DKsFGcH9/"

# Configure your database
config :pms_api, PmsApi.Repo,
  username: "postgres",
  password: "postgres",
  database: "pms_api_prod",
  pool_size: 15
