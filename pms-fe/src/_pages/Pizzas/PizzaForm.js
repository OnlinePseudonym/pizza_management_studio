import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import to from '../../_helpers/to';

class PizzaForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: ''
    };

    this.deletePizza = this.deletePizza.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async deletePizza() {
    console.log(this);
    const [err, response] = await to(this.props.pizzaService.deletePizza(this.props.pizza.id));

    if (err) {
      console.error(err);
    } else {
      console.log(response);
      this.props.updatePizzas();
    }
  }

  onClick(e) {
    console.log(e.target.value);
    this.setState({ tag: e.target.value });
  }

  render() {
    const { name, description, toppings, loading, submitted, error, isAdd } = this.props.formData;
    const filteredToppings = this.state.tag
      ? this.props.toppings.filter(topping => topping.tag.includes(this.state.tag))
      : this.props.toppings;
    const tags = [...new Set(this.props.toppings.map(topping => topping.tag).flat())];

    return (
      <form name="add-pizza" onSubmit={this.props.handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input className="input" type="text" name="name" value={name} onChange={this.props.handleChange} required />
          {isAdd && submitted && !name && <div>Name is required</div>}
        </div>
        <div className="field">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            className="textarea"
            name="description"
            value={description}
            onChange={this.props.handleChange}
            required={isAdd}
          />
          {isAdd && submitted && !description && <div>Description is required</div>}
        </div>
        <fieldset className="field">
          <legend className="label">Toppings</legend>
          <div className="field">
            <div>
              <em>Filters</em>
            </div>
            <div className="field is-grouped">
              {tags.map((tag, i) => {
                return (
                  <div key={i} className="control">
                    <button type="button" className="button" value={tag} onClick={this.onClick}>
                      {tag}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="field is-grouped is-grouped-multiline">
            {filteredToppings.map(topping => {
              return (
                <div className="control" key={topping.id}>
                  <label className="checkbox">
                    <input
                      onChange={this.props.handleGroupCheckboxChange}
                      title={topping.description}
                      type="checkbox"
                      name="toppings"
                      value={topping.id}
                      checked={toppings.includes(topping.id)}
                    />
                    {topping.name}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
        <div className="field is-grouped" style={{ paddingTop: '1.6rem' }}>
          <div className="control">
            <button disabled={loading} type="submit" className="button">
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
          {loading && <FontAwesomeIcon icon="cog" spin />}
        </div>
        {error && <div>{error}</div>}
      </form>
    );
  }
}

export default PizzaForm;
