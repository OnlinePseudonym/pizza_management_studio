import React from 'react';

import PizzaForm from './PizzaForm';

class AddPizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      toppings: [],
      loading: false,
      submitted: false,
      error: '',
      isAdd: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value =
      e.target.name === 'toppings' ? e.target.value.split(',').map(topping => topping.trim()) : e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this);
    this.setState({ submitted: true });
    const { name, description, toppings } = this.state;

    if (!(name && description)) {
      return;
    }

    this.setState({ loading: true });
    this.props.pizzaService
      .createPizza({ name, description, toppings })
      .then(
        pizza => this.props.updatePizzas(),
        error => this.setState({ error: JSON.stringify(error), loading: false })
      );
  }

  render() {
    return <PizzaForm formData={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
  }
}

export default AddPizza;
