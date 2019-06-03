import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PanelBlockButtons(props) {
  return (
    <div className="field is-grouped" style={{ paddingTop: '1.6rem' }}>
      <div className="control">
        <button disabled={props.loading} type="submit" className="button">
          Save
        </button>
      </div>
      {props.isAdd ? (
        <div className="control">
          <button type="button" className="button" onClick={props.toggle}>
            Close
          </button>
        </div>
      ) : (
        <div className="control">
          <button type="button" className="button" onClick={props.delete}>
            Delete
          </button>
        </div>
      )}
      {props.loading && <FontAwesomeIcon icon="cog" spin />}
    </div>
  );
}

export default PanelBlockButtons;
