import React from "react";

const FormTextArea = ({ input, label, placeholder, rows, disabled }) => (
  <div className="form-group mb-3">
    <textarea
      {...input}
      placeholder={placeholder}
      className="form-control"
      rows={rows}
      disabled={disabled}
    />
  </div>
);

export default FormTextArea;
