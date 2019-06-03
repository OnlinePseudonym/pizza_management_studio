import React from 'react';

import to from '../../_helpers/to';
import TextInput from '../../_components/TextInput';
import PanelBlockButtons from '../../_components/PanelBlockButtons';

class UserForm extends React.Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
  }

  async deleteUser() {
    const [err, response] = await to(this.props.userService.deleteUser(this.props.user.id));

    if (err) {
      console.error(err);
    } else {
      this.props.updateUsers();
    }
  }

  render() {
    const { email, password, is_manager, loading, submitted, error, isAdd } = this.props.formData;

    return (
      <form onSubmit={this.props.handleSubmit}>
        <TextInput
          value={email}
          type={'text'}
          label={'Email'}
          handleChange={this.props.handleChange}
          isRequired={true}
          submitted={submitted}
        />
        <TextInput
          value={password}
          type={'password'}
          label={'Password'}
          handleChange={this.props.handleChange}
          isRequired={true}
          submitted={submitted}
        />
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="is_manager" checked={is_manager} onChange={this.props.handleChange} />
              User is a pizza operation manager.
            </label>
          </div>
        </div>
        <PanelBlockButtons delete={this.deleteUser} toggle={this.props.toggleAdding} loading={loading} isAdd={isAdd} />
        {error && <div>{error}</div>}
      </form>
    );
  }
}

export default UserForm;
