import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import FormInput from "../../../shared/form/FormInput";

class AddPlaceForm extends Component {
  render() {
    const { handleSubmit, pristine, submitSucceeded, onSubmit } = this.props;
    return (
      <form className="add-place-form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="name"
          type="text"
          placeholder="Enter place name"
          component={FormInput}
        />
        <Field
          name="address"
          type="text"
          placeholder="Enter place address"
          component={FormInput}
        />

        <Field
          name="phone"
          type="text"
          placeholder="Enter place phone"
          component={FormInput}
        />
        <Field
          name="website"
          type="text"
          placeholder="Enter place website"
          component={FormInput}
        />
        <button
          className="btn btn-form"
          type="submit"
          disabled={pristine || submitSucceeded}
        >
          Submit
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "You must enter name!";
  }

  if (!values.address) {
    errors.address = "You must enter address!";
  }

  if (!values.phone) {
    errors.phone = "You must enter phone number!";
  }
  return errors;
};

export default reduxForm({
  form: "addPlace",
  validate
})(AddPlaceForm);
