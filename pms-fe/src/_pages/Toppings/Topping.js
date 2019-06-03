import React from 'react';

import EditTopping from './EditTopping';
import PanelBlock from '../../_components/PanelBlock';

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
      <PanelBlock name={this.props.topping.name} isEditing={this.state.isEditing} toggleEditing={this.toggleEditing}>
        <EditTopping
          updateToppings={this.props.updateToppings}
          toppingService={this.props.toppingService}
          topping={this.props.topping}
          toggleEditing={this.toggleEditing}
        />
      </PanelBlock>
    );
  }
}

export default Topping;
