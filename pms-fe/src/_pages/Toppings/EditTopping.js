import React from 'react';

import ToppingForm from './ToppingForm';

class EditTopping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.topping.name,
      description: this.props.topping.description,
      tag: '',
      tags: this.props.topping.tag,
      loading: false,
      submitted: false,
      isAdd: false,
      error: ''
    };

    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  addTag(e) {
    if (!this.state.tag) return;

    const tag = this.state.tag;
    const tags = [...this.state.tags];
    console.log(tag);
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
    const params = {};

    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        const element = this.state[key];
        if (element) {
          if (key === 'tag') return;
          if (key === 'tags') {
            params.tag = element;
          } else {
            params[key] = element;
          }
        }
      }
    }

    this.setState({ loading: true });

    this.props.toppingService.updateTopping(this.props.topping.id, params).then(
      topping => {
        console.log(topping);
        this.setState({ loading: false });
        this.props.toggleEditing();
        this.props.updateToppings();
      },
      error => this.setState({ error: JSON.stringify(error), loading: false })
    );
  }

  render() {
    return (
      <ToppingForm
        topping={this.props.topping}
        formData={this.state}
        toppingService={this.props.toppingService}
        addTag={this.addTag}
        removeTag={this.removeTag}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        updateToppings={this.props.updateToppings}
      />
    );
  }
}

export default EditTopping;
