import React from "react";
import Rate from "./common/rate";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <Rate value={value} starRange={1} />
      <Rate value={value} starRange={2} />
      <Rate value={value} starRange={3} />
      <Rate value={value} starRange={4} />
      <Rate value={value} starRange={5} />
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
