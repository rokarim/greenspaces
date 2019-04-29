import React from 'react';

const TextArea = props => {
  return (
    <label className={props.className}>{props.label}
      <textarea
        id={props.name}
        name={props.name}
        type='text'
        value={props.content}
        onChange={props.handlerFunction}
      />
    </label>
  );
}

export default TextArea;
