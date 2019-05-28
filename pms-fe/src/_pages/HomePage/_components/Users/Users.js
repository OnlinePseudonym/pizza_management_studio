import React from 'react';

import { userService } from '../../../../_services/user.service';
import to from '../../../../_helpers/to';
import User from './User';
import AddUser from './AddUser';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isFetching: false,
      addUser: false
    };

    this.addUser = this.addUser.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  async fetchUsers() {
    this.setState({ loading: false, addUser: false, isFetching: true });
    const [err, users] = await to(userService.getUsers());

    if (err) {
      console.error(err);
    }

    if (!users) {
      console.log('No users found');
      this.setState({ isFetching: false });
      return;
    }

    this.setState({ users: users.data, isFetching: false });
  }

  componentDidMount() {
    this.fetchUsers();
  }

  addUser() {
    if (this.state.addUser) {
      this.setState({ addUser: false });
    } else {
      this.setState({ addUser: true });
    }
  }

  render() {
    return (
      <div>
        <h2>User Management</h2>
        {this.state.isFetching && <div>Fetching Users</div>}
        {this.state.users.length > 0 &&
          this.state.users.map(user => <User user={user} key={user.id} updateUsers={this.fetchUsers} />)}
        {!this.state.addUser && (
          <button type="button" onClick={this.addUser}>
            Add User
          </button>
        )}
        {this.state.addUser && <AddUser updateUsers={this.fetchUsers} userService={userService} />}
      </div>
    );
  }
}

export default Users;
