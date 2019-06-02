import React from 'react';

import to from '../../_helpers/to';
import EditPizza from './EditPizza';

class Pizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.editPizza = this.editPizza.bind(this);
    this.notEditing = this.notEditing.bind(this);
    this.deletePizza = this.deletePizza.bind(this);
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

  editPizza(e) {
    this.setState({ isEditing: true });
  }

  notEditing() {
    this.setState({ isEditing: false });
  }

  render() {
    return (
      <div>
        <div>{this.props.pizza.name}</div>
        <button type="button" onClick={this.deletePizza}>
          Delete Pizza
        </button>
        <button type="button" onClick={this.editPizza}>
          Edit Pizza
        </button>
        {this.state.isEditing && (
          <div>
            <EditPizza
              updatePizzas={this.props.updatePizzas}
              pizzaService={this.props.pizzaService}
              pizza={this.props.pizza}
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

export default Pizza;
