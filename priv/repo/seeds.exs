# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     PmsApi.Repo.insert!(%PmsApi.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias PmsApi.Repo
alias PmsApi.Pizzas.Topping

Repo.insert! %Topping{name: "Pepperoni", description: "American variety of salami, made from cured pork and beef mixed together and seasoned with paprika or other chili pepper.", tag: ["meat"]}

Repo.insert! %Topping{name: "Italian Sausage", description: "Pork sausage seasoned with fennel", tag: ["meat"]}

Repo.insert! %Topping{name: "Mushroom", description: "Hearty meat-like mushrooms are an economical and nutritious way to enhance any meal.", tag: ["vegetable"]}

Repo.insert! %Topping{name: "Green Bell Pepper", description: "Crunchy with an aromatic, green, less sweet and almost bitter flavor than the other colored varieties", tag: ["vegetable"]}

Repo.insert! %Topping{name: "Red Bell Pepper", description: "Hearty meat-like mushrooms are an economical and nutritious way to enhance any meal.", tag: ["vegetable"]}

Repo.insert! %Topping{name: "Onion", description: "Sweet and earthy flavor.", tag: ["vegetable"]}

Repo.insert! %Topping{name: "Black Olive", description: "Salty and mild.", tag: ["vegetable"]}