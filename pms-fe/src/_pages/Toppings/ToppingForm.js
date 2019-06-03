import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import to from '../../_helpers/to';

class ToppingForm extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
  }

  async delete() {
    console.log(this);
    const [err, response] = await to(this.props.toppingService.deleteTopping(this.props.topping.id));

    if (err) {
      console.error(err);
    } else {
      console.log(response);
      this.props.updateToppings();
    }
  }

  render() {
    const { name, description, tag, tags, loading, submitted, error, isAdd } = this.props.formData;

    return (
      <form onSubmit={this.props.handleSubmit}>
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

export default ToppingForm;
