import React from "react";

const FormInput = ({ input, placeholder, type, meta: { touched, error } }) => (
  <div className="form-group">
    <input
      {...input}
      type={type}
      className="form-control"
      placeholder={placeholder}
      autoComplete="off"
    />
    {touched && (error && <div className="alert alert-danger">{error}</div>)}
  </div>
);

export default FormInput;
