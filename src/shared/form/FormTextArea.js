import React from "react";

const FormTextArea = ({ input, label, placeholder, rows }) => (
  <div className="form-group mb-3">
    <textarea
      {...input}
      placeholder={placeholder}
      className="form-control"
      rows={rows}
    />
  </div>
);

export default FormTextArea;
