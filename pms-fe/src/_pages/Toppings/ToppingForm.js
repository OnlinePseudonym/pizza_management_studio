import React from 'react';

import Loading from '../../_components/_images/loading';

function ToppingForm(props) {
  const { name, description, tag, loading, submitted, error, isAdd } = props.formData;

  return (
    <form name="add-topping" onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={props.handleChange} required={isAdd} />
        {isAdd && submitted && !name && <div>Name is required</div>}
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" value={description} onChange={props.handleChange} required={isAdd} />
        {isAdd && submitted && !description && <div>Description is required</div>}
      </div>
      <div>
        <label htmlFor="tag">Tags</label>
        <input type="text" name="tag" value={tag} onChange={props.handleChange} />
      </div>
      <div>
        <button disabled={loading}>{isAdd ? 'Add Topping' : 'Update Topping'}</button>
        {loading && <Loading />}
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}

export default ToppingForm;
