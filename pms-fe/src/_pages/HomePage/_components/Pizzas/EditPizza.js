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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleChange(e) {
    const name = e.target.name;
    const value =
      e.target.name === 'toppings' ? e.target.value.split(',').map(topping => topping.trim()) : e.target.value;
    this.setState({ [name]: value });
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
        this.props.notEditing();
        this.props.updatePizzas();
      },
      error => this.setState({ error: JSON.stringify(error), loading: false })
    );
  }

  render() {
    return <PizzaForm formData={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
  }
}

export default EditPizza;
