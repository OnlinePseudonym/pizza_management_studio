import React from 'react';

import Loading from '../../_components/_images/loading';

function PizzaForm(props) {
  const { name, description, toppings, loading, submitted, error, isAdd } = props.formData;

  return (
    <form name="add-pizza" onSubmit={props.handleSubmit}>
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
        <label htmlFor="toppings">Toppings</label>
        <input type="text" name="toppings" value={toppings} onChange={props.handleChange} />
      </div>
      <div>
        <button disabled={loading}>{isAdd ? 'Add Pizza' : 'Update Pizza'}</button>
        {loading && <Loading />}
      </div>
      {error && <div>{error}</div>}
    </form>
  );
}

export default PizzaForm;
