import React from 'react';

import ToppingForm from './ToppingForm';

class AddTopping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      tag: [],
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
    const value = e.target.name === 'tag' ? [e.target.value] : e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this);
    this.setState({ submitted: true });
    const { name, description, tag } = this.state;

    if (!(name && description)) {
      return;
    }

    this.setState({ loading: true });
    this.props.toppingService
      .createTopping({ name, description, tag })
      .then(
        topping => this.props.updateToppings(),
        error => this.setState({ error: JSON.stringify(error), loading: false })
      );
  }

  render() {
    return (
      <ToppingForm
        toggleAdding={this.props.toggleAdding}
        formData={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddTopping;
