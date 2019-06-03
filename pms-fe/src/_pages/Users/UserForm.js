import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import to from '../../_helpers/to';

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
      console.log(response);
      this.props.updateUsers();
    }
  }

  render() {
    const { email, password, is_manager, loading, submitted, error, isAdd } = this.props.formData;

    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="email">
            <span>*</span> Email Address
          </label>
          <input
            className="input"
            type="text"
            name="email"
            value={email}
            onChange={this.props.handleChange}
            autoComplete="new-password"
            required
          />
          {isAdd && submitted && !email && <div>Email is required</div>}
        </div>
        <div className="field">
          <label className="label" htmlFor="password">
            {isAdd && <span>*</span>} Password
          </label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={this.props.handleChange}
            autoComplete="new-password"
            required={isAdd}
          />
          {isAdd && submitted && !password && <div>Password is required</div>}
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="is_manager" checked={is_manager} onChange={this.props.handleChange} />
              User is a pizza operation manager.
            </label>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button">
              Save
            </button>
          </div>
          {isAdd ? (
            <div className="control">
              <button type="button" className="button" onClick={this.props.toggleAdding}>
                Close
              </button>
            </div>
          ) : (
            <div className="control">
              <button type="button" className="button" onClick={this.deleteUser}>
                Delete
              </button>
            </div>
          )}
          {/* <button disabled={loading}>{isAdd ? 'Add User' : 'Update User'}</button> */}
          {loading && <FontAwesomeIcon icon="cog" spin />}
        </div>
        {error && <div>{error}</div>}
      </form>
    );
  }
}

export default UserForm;
