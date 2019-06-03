import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PanelBlock(props) {
  return (
    <div className="panel-block">
      <div className="box container">
        <div className="columns" style={{ justifyContent: 'space-between' }}>
          <p className="subtitle is-6">{props.name}</p>
          <button className="button" onClick={props.toggleEditing}>
            <span className="icon is-small">
              <FontAwesomeIcon icon="angle-down" />
            </span>
          </button>
        </div>
        {props.isEditing && <div>{props.children}</div>}
      </div>
    </div>
  );
}

export default PanelBlock;
