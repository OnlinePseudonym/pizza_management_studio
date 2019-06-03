import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EditTopping from './EditTopping';

class Topping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    return (
      <div className="panel-block">
        <div className="box container">
          <div className="columns" style={{ justifyContent: 'space-between' }}>
            <p className="subtitle is-6">{this.props.topping.name}</p>
            <button className="button" onClick={this.toggleEditing}>
              <span className="icon is-small">
                <FontAwesomeIcon icon="angle-down" />
              </span>
            </button>
          </div>
          {this.state.isEditing && (
            <div>
              <EditTopping
                updateToppings={this.props.updateToppings}
                toppingService={this.props.toppingService}
                topping={this.props.topping}
                toggleEditing={this.toggleEditing}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Topping;
