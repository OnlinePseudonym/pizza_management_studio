import React from 'react';

import to from '../../_helpers/to';
import TextInput from '../../_components/TextInput';
import TextArea from '../../_components/TextArea';
import PanelBlockButtons from '../../_components/PanelBlockButtons';

class ToppingForm extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  async delete() {
    const [err, response] = await to(this.props.toppingService.deleteTopping(this.props.topping.id));

    if (err) {
      console.error(err);
    } else {
      this.props.updateToppings();
    }
  }

  render() {
    const { name, description, tag, tags, loading, submitted, error, isAdd } = this.props.formData;

    return (
      <form onSubmit={this.props.handleSubmit}>
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
        <div className="field">
          <label className="label">Tags</label>
          {tags.length > 0 && (
            <div className=" field is-grouped is-grouped-multiline">
              {tags.map((tag, i) => (
                <div
                  className="box"
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', margin: '0 1rem 0.75rem 0' }}
                >
                  <strong>{tag}&nbsp;&nbsp;</strong>
                  <button className="button" type="button" onClick={e => this.props.removeTag(e, i)}>
                    x
                  </button>
                </div>
              ))}
            </div>
          )}

          <input className="input" type="text" name="tag" value={tag} onChange={this.props.handleChange} />
          <button type="button" className="button" onClick={this.props.addTag}>
            Add Tag
          </button>
        </div>
        <PanelBlockButtons delete={this.delete} toggle={this.props.toggleAdding} loading={loading} isAdd={isAdd} />
        {error && <div>{error}</div>}
      </form>
    );
  }
}

export default ToppingForm;
