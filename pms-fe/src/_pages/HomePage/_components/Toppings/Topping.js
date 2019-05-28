import React from 'react';

import to from '../../../../_helpers/to';
import EditTopping from './EditTopping';

class Topping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };

    this.editTopping = this.editTopping.bind(this);
    this.notEditing = this.notEditing.bind(this);
    this.deleteTopping = this.deleteTopping.bind(this);
  }

  async deleteTopping() {
    console.log(this);
    const [err, response] = await to(this.props.toppingService.deleteTopping(this.props.topping.id));

    if (err) {
      console.error(err);
    } else {
      console.log(response);
      this.props.updateToppings();
    }
  }

  editTopping(e) {
    this.setState({ isEditing: true });
  }

  notEditing() {
    this.setState({ isEditing: false });
  }

  render() {
    return (
      <div>
        <div>{this.props.topping.name}</div>
        <button type="button" onClick={this.deleteTopping}>
          Delete Topping
        </button>
        <button type="button" onClick={this.editTopping}>
          Edit Topping
        </button>
        {this.state.isEditing && (
          <div>
            <EditTopping
              updateToppings={this.props.updateToppings}
              toppingService={this.props.toppingService}
              topping={this.props.topping}
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

export default Topping;
