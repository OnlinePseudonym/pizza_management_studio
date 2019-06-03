import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EditPizza from './EditPizza';

class Pizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing(e) {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    return (
      <div className="panel-block">
        <div className="box container">
          <div className="columns" style={{ justifyContent: 'space-between' }}>
            <p className="subtitle is-6">{this.props.pizza.name}</p>
            <button className="button" onClick={this.toggleEditing}>
              <span className="icon is-small">
                <FontAwesomeIcon icon="angle-down" />
              </span>
            </button>
          </div>
          {this.state.isEditing && (
            <div>
              <EditPizza
                updatePizzas={this.props.updatePizzas}
                pizzaService={this.props.pizzaService}
                pizza={this.props.pizza}
                toppings={this.props.toppings}
                toggleEditing={this.toggleEditing}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Pizza;
