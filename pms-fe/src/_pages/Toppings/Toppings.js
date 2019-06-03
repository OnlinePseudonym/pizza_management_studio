import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import toppingService from '../../_services/topping.service';
import to from '../../_helpers/to';
import Topping from './Topping';
import AddTopping from './AddToppings';

class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isAdding: false,
      isFetching: false,
      filter: '',
      toppings: []
    };

    this.fetchToppings = this.fetchToppings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleAdding = this.toggleAdding.bind(this);
  }

  componentDidMount() {
    this.fetchToppings();
  }

  async fetchToppings() {
    this.setState({ loading: false, isAdding: false, isFetching: true });
    const [err, toppings] = await to(toppingService.getToppings());

    if (err) {
      console.error(err);
    }

    if (!toppings.data.length) {
      console.log('No Toppings found');
      this.setState({ isFetching: false });
      return;
    }
    console.log(toppings);
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
          <h2 className="panel-heading">Topping Management</h2>
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
              Fetching Toppings
            </div>
          )}
          {this.state.toppings.length > 0 &&
            this.state.toppings
              .filter(topping => topping.name.toLowerCase().includes(this.state.filter.toLowerCase()))
              .map(topping => (
                <Topping
                  topping={topping}
                  toppingService={toppingService}
                  updateToppings={this.fetchToppings}
                  key={topping.id}
                />
              ))}
          {!this.state.isAdding && (
            <div className="panel-block">
              <button className="button is-link is-outlined is-fullwidth" type="button" onClick={this.toggleAdding}>
                Add Topping
              </button>
            </div>
          )}
          {this.state.isAdding && (
            <div className="panel-block">
              <AddTopping
                pizzas={this.state.pizzas}
                toggleAdding={this.toggleAdding}
                updateToppings={this.fetchToppings}
                toppingService={toppingService}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Toppings;
