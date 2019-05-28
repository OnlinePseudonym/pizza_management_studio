import React from 'react';

import Loading from '../../../../_components/_images/loading';

function UserForm(props) {
  const { email, password, is_manager, loading, submitted, error, isAdd } = props.formData;

  return (
    <form name="add-user" onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="text" name="email" value={email} onChange={props.handleChange} required={isAdd} />
        {isAdd && submitted && !email && <div>Email is required</div>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={props.handleChange} required={isAdd} />
        {isAdd && submitted && !password && <div>Password is required</div>}
      </div>
      <div>
        <label htmlFor="is_manager">Pizza Operation Manager</label>
        <input type="checkbox" name="is_manager" checked={is_manager} onChange={props.handleChange} />
      </div>
      <div>
        <button disabled={loading}>{isAdd ? 'Add User' : 'Update User'}</button>
        {loading && <Loading />}
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}

export default UserForm;
