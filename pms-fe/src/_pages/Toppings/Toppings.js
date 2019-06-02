import React from 'react';

import toppingService from '../../_services/topping.service';
import to from '../../_helpers/to';
import Topping from './Topping';
import AddTopping from './AddToppings';

class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      addTopping: false,
      isFetching: false,
      toppings: []
    };

    this.fetchToppings = this.fetchToppings.bind(this);
    this.addTopping = this.addTopping.bind(this);
  }

  componentDidMount() {
    this.fetchToppings();
  }

  async fetchToppings() {
    this.setState({ loading: false, addTopping: false, isFetching: true });
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

  addTopping() {
    if (this.state.addTopping) {
      this.setState({ addTopping: false });
    } else {
      this.setState({ addTopping: true });
    }
  }

  render() {
    return (
      <div>
        <h2>Topping Management</h2>
        {this.state.isFetching && <div>Fetching Toppings</div>}
        {this.state.toppings.length > 0 &&
          this.state.toppings.map(topping => (
            <Topping
              topping={topping}
              toppingService={toppingService}
              updateToppings={this.fetchToppings}
              key={topping.id}
            />
          ))}
        {!this.state.addTopping && (
          <button type="button" onClick={this.addTopping}>
            Add Topping
          </button>
        )}
        {this.state.addTopping && <AddTopping updateToppings={this.fetchToppings} toppingService={toppingService} />}
      </div>
    );
  }
}

export default Toppings;
