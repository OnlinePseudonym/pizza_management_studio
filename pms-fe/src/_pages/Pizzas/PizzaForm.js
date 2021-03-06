import React from 'react';

import to from '../../_helpers/to';
import TextInput from '../../_components/TextInput';
import TextArea from '../../_components/TextArea';
import PanelBlockButtons from '../../_components/PanelBlockButtons';

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
    const [err, response] = await to(this.props.pizzaService.deletePizza(this.props.pizza.id));

    if (err) {
      console.error(err);
    } else {
      this.props.updatePizzas();
    }
  }

  onClick(e) {
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
        <TextInput
          value={name}
          label={'Name'}
          handleChange={this.props.handleChange}
          isRequired={isAdd}
          submitted={submitted}
        />
        <TextArea
          value={description}
          label={'Description'}
          handleChange={this.props.handleChange}
          isRequired={isAdd}
          submitted={submitted}
        />
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
        <PanelBlockButtons delete={this.deletePizza} toggle={this.props.toggleAdding} loading={loading} isAdd={isAdd} />
        {error && <div>{error}</div>}
      </form>
    );
  }
}

export default PizzaForm;
