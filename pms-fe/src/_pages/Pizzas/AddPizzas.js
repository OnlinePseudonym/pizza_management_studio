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
    this.handleGroupCheckboxChange = this.handleGroupCheckboxChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleGroupCheckboxChange(e) {
    const value = parseInt(e.target.value);
    let toppings = [...this.state.toppings];
    e.target.checked ? toppings.push(value) : (toppings = toppings.filter(x => x !== value));
    this.setState({ toppings });
  }

  handleSubmit(e) {
    e.preventDefault();

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
    return (
      <PizzaForm
        toggleAdding={this.props.toggleAdding}
        toppings={this.props.toppings}
        formData={this.state}
        handleChange={this.handleChange}
        handleGroupCheckboxChange={this.handleGroupCheckboxChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddPizza;
