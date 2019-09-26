import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import FormStars from "../../shared/form/FormStars";
import FormInput from "../../shared/form/FormInput";
import FormTextArea from "../../shared/form/FormTextArea";

class ReviewForm extends Component {
  render() {
    const { handleSubmit, pristine, submitSucceeded, onSubmit } = this.props;
    console.log(submitSucceeded);
    return (
      <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="rating"
          label="Rate this place:"
          starRatedColor="orange"
          numberOfStars={5}
          starDimension="1.8rem"
          starSpacing=".2rem"
          component={FormStars}
        />
        <Field
          name="author_name"
          type="text"
          placeholder="Enter your name"
          disabled={submitSucceeded}
          component={FormInput}
        />
        <Field
          name="text"
          type="text"
          rows="10"
          placeholder="Place for your review"
          disabled={submitSucceeded}
          component={FormTextArea}
        />
        <button
          className="btn btn-form btn-rw"
          type="submit"
          disabled={pristine || submitSucceeded}
        >
          Send
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: { rating: 0 }
});

const validate = values => {
  const errors = {};
  if (!values.rating) {
    errors.rating = "You must enter a rating!";
  }

  if (!values.author_name) {
    errors.author_name = "You must enter your name!";
  }

  return errors;
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "postReview",
    enableReinitialize: true,
    validate
  })(ReviewForm)
);
