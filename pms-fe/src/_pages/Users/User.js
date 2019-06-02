import React from 'react';

import EditUser from './EditUser';
import to from '../../_helpers/to';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.editUser = this.editUser.bind(this);
    this.notEditing = this.notEditing.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async deleteUser() {
    const [err, response] = await to(this.props.userService.deleteUser(this.props.user.id));

    if (err) {
      console.error(err);
    } else {
      console.log(response);
      this.props.updateUsers();
    }
  }

  editUser(e) {
    this.setState({ isEditing: true });
  }

  notEditing() {
    this.setState({ isEditing: false });
  }

  render() {
    return (
      <div>
        <div>{this.props.user.email}</div>
        <button type="button" onClick={this.deleteUser}>
          Delete User
        </button>
        <button type="button" onClick={this.editUser}>
          Edit User
        </button>
        {this.state.isEditing && (
          <div>
            <EditUser
              updateUsers={this.props.updateUsers}
              userService={this.props.userService}
              user={this.props.user}
              notEditing={this.notEditing}
            />
            <button type="button" onClick={this.notEditing}>
              close
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default User;
