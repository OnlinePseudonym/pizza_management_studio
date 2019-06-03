import React from 'react';

import PizzaForm from './PizzaForm';

class EditPizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.pizza.name,
      description: this.props.pizza.description,
      toppings: this.props.pizza.toppings,
      loading: false,
      submitted: false,
      isAdd: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGroupCheckboxChange = this.handleGroupCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

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
    const params = {};

    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        const element = this.state[key];
        if (element) {
          params[key] = element;
        }
      }
    }

    this.setState({ loading: true });

    this.props.pizzaService.updatePizza(this.props.pizza.id, params).then(
      pizza => {
        this.setState({ loading: false });
        this.props.toggleEditing();
        this.props.updatePizzas();
      },
      error => this.setState({ error: JSON.stringify(error), loading: false })
    );
  }

  render() {
    return (
      <PizzaForm
        pizza={this.props.pizza}
        toppings={this.props.toppings}
        formData={this.state}
        pizzaService={this.props.pizzaService}
        handleChange={this.handleChange}
        handleGroupCheckboxChange={this.handleGroupCheckboxChange}
        handleSubmit={this.handleSubmit}
        updatePizzas={this.props.updatePizzas}
      />
    );
  }
}

export default EditPizza;
