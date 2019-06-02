import React from 'react';

import UserForm from './UserForm';

class AddUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      is_manager: false,
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
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password, is_manager } = this.state;

    if (!(email && password)) {
      return;
    }

    this.setState({ loading: true });
    this.props.userService
      .createUser({ email, password, is_manager })
      .then(user => this.props.updateUsers(), error => this.setState({ error: JSON.stringify(error), loading: false }));
  }

  render() {
    return (
      <div className="container">
        <div className="box">
          <UserForm
            toggleAdding={this.props.toggleAdding}
            formData={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default AddUser;
