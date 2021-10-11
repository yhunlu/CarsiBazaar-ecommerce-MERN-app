import React from "react";
import PropTypes from "prop-types";

const Rate = ({ value, starRange, color }) => {
  return (
    <span>
      <i
        style={{ color }}
        className={
          value >= starRange
            ? "fas fa-star"
            : value >= starRange - 0.5
            ? "fas fa-star-half-alt"
            : "far fa-star"
        }
      ></i>
    </span>
  );
};

Rate.defaultProps = {
  color: "#ffa600",
};

Rate.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Rate;
