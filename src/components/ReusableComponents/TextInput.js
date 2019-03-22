import React, { Component } from 'react';

const TextInput = ({
  placeholder, //for placeholder value in input
  size, //for col number
  id, //id so label can match input
  label, //text for label
  inputValue, //so parent's state is linked to child
  handleChange, //function so child can change parent's state
  inputName //Name of state handle change is trying to change
}) => {
  const onChange = e => {
    handleChange(inputName, e.target.value);
  };
  return (
    <div className={`input-field col s${size}`}>
      <input
        placeholder={placeholder}
        id={id}
        type='text'
        className='validate'
        onChange={onChange}
        value={inputValue}
      />
      <label for={id}>{label}</label>
    </div>
  );
};

export default TextInput;
