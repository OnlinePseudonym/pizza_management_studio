import React from 'react';

import pizzaService from '../../_services/pizza.service';
import to from '../../_helpers/to';
import Pizza from './Pizza';
import AddPizza from './AddPizzas';

class Pizzas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      addPizza: false,
      isFetching: false,
      pizzas: []
    };

    this.fetchPizzas = this.fetchPizzas.bind(this);
    this.addPizza = this.addPizza.bind(this);
  }

  componentDidMount() {
    this.fetchPizzas();
  }

  async fetchPizzas() {
    this.setState({ loading: false, addPizza: false, isFetching: true });
    const [err, pizzas] = await to(pizzaService.getPizzas());

    if (err) {
      console.error(err);
    }

    if (!pizzas.data.length) {
      console.log('No pizzas found');
      this.setState({ isFetching: false });
      return;
    }
    console.log(pizzas);
    this.setState({ pizzas: pizzas.data, isFetching: false });
  }

  addPizza() {
    if (this.state.addPizza) {
      this.setState({ addPizza: false });
    } else {
      this.setState({ addPizza: true });
    }
  }

  render() {
    return (
      <div className="section">
        <h2>Pizza Management</h2>
        {this.state.isFetching && <div>Fetching Pizzas</div>}
        {this.state.pizzas.length > 0 &&
          this.state.pizzas.map(pizza => (
            <Pizza pizza={pizza} pizzaService={pizzaService} updatePizzas={this.fetchPizzas} key={pizza.id} />
          ))}
        {!this.state.addPizza && (
          <button type="button" onClick={this.addPizza}>
            Add Pizza
          </button>
        )}
        {this.state.addPizza && <AddPizza updatePizzas={this.fetchPizzas} pizzaService={pizzaService} />}
      </div>
    );
  }
}

export default Pizzas;
