import React from 'react';

import EditPizza from './EditPizza';
import PanelBlock from '../../_components/PanelBlock';

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
      <PanelBlock name={this.props.pizza.name} isEditing={this.state.isEditing} toggleEditing={this.toggleEditing}>
        <EditPizza
          updatePizzas={this.props.updatePizzas}
          pizzaService={this.props.pizzaService}
          pizza={this.props.pizza}
          toppings={this.props.toppings}
          toggleEditing={this.toggleEditing}
        />
      </PanelBlock>
    );
  }
}

export default Pizza;
