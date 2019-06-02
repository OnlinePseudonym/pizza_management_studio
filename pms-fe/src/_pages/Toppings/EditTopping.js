import React from 'react';

import ToppingForm from './ToppingForm';

class EditTopping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.topping.name,
      description: this.props.topping.description,
      tag: this.props.topping.tag,
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
    const value = e.target.name === 'tag' ? [e.target.value] : e.target.value;
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

    this.props.toppingService.updateTopping(this.props.topping.id, params).then(
      topping => {
        this.setState({ loading: false });
        this.props.notEditing();
        this.props.updateToppings();
      },
      error => this.setState({ error: JSON.stringify(error), loading: false })
    );
  }

  render() {
    return <ToppingForm formData={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
  }
}

export default EditTopping;
