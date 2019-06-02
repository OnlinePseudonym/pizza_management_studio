import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userService from '../../_services/user.service';
import to from '../../_helpers/to';
import User from './User';
import AddUser from './AddUser';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filter: '',
      isFetching: false,
      isAdding: false
    };

    this.toggleAdding = this.toggleAdding.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async fetchUsers() {
    this.setState({ isAdding: false, isFetching: true });
    const [err, users] = await to(userService.getUsers());

    if (err) {
      console.error(err);
    }

    if (!users.data.length) {
      console.log('No users found');
      this.setState({ isFetching: false });
      return;
    }

    this.setState({ users: users.data, isFetching: false });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  toggleAdding() {
    this.setState({ isAdding: !this.state.isAdding });
  }

  handleChange(e) {
    this.setState({ filter: e.target.value });
  }

  render() {
    return (
      <div className="section">
        <div className="panel">
          <h2 className="panel-heading">User Management</h2>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-small"
                type="text"
                placeholder="search"
                value={this.state.filter}
                onChange={this.handleChange}
              />
              <span className="icon is-small is-left" style={{ padding: '0.4rem' }}>
                <FontAwesomeIcon icon="search" />
              </span>
            </p>
          </div>
          {this.state.isFetching && (
            <div>
              <FontAwesomeIcon icon="cog" spin />
              Fetching Users
            </div>
          )}
          {this.state.users.length > 0 &&
            this.state.users
              .filter(user => user.email.includes(this.state.filter))
              .map(user => <User user={user} key={user.id} userService={userService} updateUsers={this.fetchUsers} />)}
          {!this.state.isAdding && (
            <div className="panel-block">
              <button className="button is-link is-outlined is-fullwidth" type="button" onClick={this.toggleAdding}>
                Add User
              </button>
            </div>
          )}
          {this.state.isAdding && (
            <div className="panel-block">
              <AddUser toggleAdding={this.toggleAdding} updateUsers={this.fetchUsers} userService={userService} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Users;
