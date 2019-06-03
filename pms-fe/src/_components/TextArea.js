import React from 'react';

function TextInput(props) {
  return (
    <div className="field">
      <label className="label" htmlFor={props.label.toLowerCase()}>
        {props.label}
      </label>
      <textarea
        className="textarea"
        name={props.label.toLowerCase()}
        value={props.value}
        onChange={props.handleChange}
        required={props.isRequired}
      />
      {props.isRequired && props.submitted && !props.value && <div>{props.label} is required</div>}
    </div>
  );
}

export default TextInput;
