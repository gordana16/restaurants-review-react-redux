import React from "react";
import StarRatings from "react-star-ratings";

const FormStars = ({
  input,
  label,
  starRatedColor,
  numberOfStars,
  starDimension,
  starSpacing,
  meta: { touched, error }
}) => (
  <div className="form-group">
    <label className="mr-3 small">{label}</label>
    <StarRatings
      name={input.name}
      starRatedColor={starRatedColor}
      numberOfStars={numberOfStars}
      starDimension={starDimension}
      starSpacing={starSpacing}
      changeRating={input.onChange}
      rating={input.value}
    />
    {touched && error && <div className="alert alert-danger">{error}</div>}
  </div>
);

export default FormStars;
