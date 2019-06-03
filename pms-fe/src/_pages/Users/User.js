import React from 'react';

import EditUser from './EditUser';
import PanelBlock from '../../_components/PanelBlock';

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
      <PanelBlock name={this.props.user.email} isEditing={this.state.isEditing} toggleEditing={this.toggleEditing}>
        <EditUser
          toggleEditing={this.toggleEditing}
          updateUsers={this.props.updateUsers}
          userService={this.props.userService}
          user={this.props.user}
        />
      </PanelBlock>
    );
  }
}

export default User;
