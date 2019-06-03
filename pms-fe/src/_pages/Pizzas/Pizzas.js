import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import pizzaService from '../../_services/pizza.service';
import toppingService from '../../_services/topping.service';
import to from '../../_helpers/to';
import Pizza from './Pizza';
import AddPizza from './AddPizzas';

class Pizzas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isAdding: false,
      isFetching: false,
      filter: '',
      pizzas: [],
      toppings: []
    };

    this.fetchPizzas = this.fetchPizzas.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdding = this.toggleAdding.bind(this);
  }

  componentDidMount() {
    this.fetchPizzas();
    this.fetchToppings();
  }

  async fetchPizzas() {
    this.setState({ loading: false, isAdding: false, isFetching: true });
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

  async fetchToppings() {
    this.setState({ loading: false, isAdding: false, isFetching: true });
    const [err, toppings] = await to(toppingService.getToppings());

    if (err) {
      console.error(err);
    }

    if (!toppings.data.length) {
      console.log('No toppings found');
      this.setState({ isFetching: false });
      return;
    }
    console.log(toppings.data);
    this.setState({ toppings: toppings.data, isFetching: false });
  }

  toggleAdding() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  handleChange(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    return (
      <div className="section">
        <div className="panel">
          <h2 className="panel-heading">Pizza Management</h2>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-small"
                type="text"
                placeholder="search"
                value={this.state.filter}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left" style={{ padding: '0.4rem' }}>
                <FontAwesomeIcon icon="search" />
              </span>
            </p>
          </div>
          {this.state.isFetching && (
            <div>
              <FontAwesomeIcon icon="cog" spin />
              Fetching Pizzas
            </div>
          )}
          {this.state.pizzas.length > 0 &&
            this.state.pizzas
              .filter(pizza => pizza.name.toLowerCase().includes(this.state.filter.toLowerCase()))
              .map(pizza => (
                <Pizza
                  toppings={this.state.toppings}
                  pizza={pizza}
                  pizzaService={pizzaService}
                  updatePizzas={this.fetchPizzas}
                  key={pizza.id}
                />
              ))}
          {!this.state.isAdding && (
            <div className="panel-block">
              <button className="button is-link is-outlined is-fullwidth" type="button" onClick={this.toggleAdding}>
                Add Pizza
              </button>
            </div>
          )}
          {this.state.isAdding && (
            <div className="panel-block">
              <AddPizza
                toppings={this.state.toppings}
                toggleAdding={this.toggleAdding}
                updatePizzas={this.fetchPizzas}
                pizzaService={pizzaService}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Pizzas;
