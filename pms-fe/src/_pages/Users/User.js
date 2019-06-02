import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EditUser from './EditUser';

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing(e) {
    e.preventDefault();

    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    return (
      <div className="panel-block">
        <div className="box container">
          <div className="columns" style={{ justifyContent: 'space-between' }}>
            <p className="subtitle is-2">{this.props.user.email}</p>
            <button className="button" onClick={this.toggleEditing}>
              <span className="icon is-small">
                <FontAwesomeIcon icon="angle-down" />
              </span>
            </button>
          </div>
          {this.state.isEditing && (
            <div>
              <EditUser
                toggleEditing={this.toggleEditing}
                updateUsers={this.props.updateUsers}
                userService={this.props.userService}
                user={this.props.user}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default User;
