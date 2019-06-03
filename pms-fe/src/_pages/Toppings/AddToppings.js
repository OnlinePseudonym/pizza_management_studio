import React from 'react';

import ToppingForm from './ToppingForm';

class AddTopping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      tag: '',
      tags: [],
      loading: false,
      submitted: false,
      error: '',
      isAdd: true
    };

    this.addTag = this.addTag.bind(this);
    this.removeTage = this.removeTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  addTag(e) {
    if (!this.state.tag) return;

    const tag = this.state.tag;
    const tags = [...this.state.tags];
    tags.push(tag.toLowerCase());
    this.setState({ tags, tag: '' });
  }

  removeTag(e, i) {
    const tags = this.state.tags;
    tags.splice(i, 1);

    this.setState({ tags });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { name, description, tags } = this.state;

    if (!(name && description)) {
      return;
    }

    this.setState({ loading: true });
    this.props.toppingService
      .createTopping({ name, description, tag: tags })
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
        addTag={this.addTag}
        removeTag={this.removeTag}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddTopping;
