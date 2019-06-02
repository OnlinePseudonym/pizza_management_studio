import React from 'react';

import UserForm from './UserForm';

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email,
      password: '',
      is_manager: this.props.user.is_manager,
      loading: false,
      submitted: false,
      isAdd: false,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const params = {};

    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        const element = this.state[key];
        if (element || key === 'is_manager') {
          params[key] = element;
        }
      }
    }

    this.setState({ loading: true });

    this.props.userService.updateUser(this.props.user.id, params).then(
      user => {
        this.setState({ loading: false });
        this.props.notEditing();
        this.props.updateUsers();
      },
      error => this.setState({ error: JSON.stringify(error), loading: false })
    );
  }

  render() {
    return <UserForm formData={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
  }
}

export default EditUser;
