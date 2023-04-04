import React from "react";
import StarIcon from "../../custom/StarIcon";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

interface Props {
  _id: string;
  image: string;
  user: string;
  rate: number;
  review: string;
}

const Review = ({ _id, image, user, rate, review }: Props) => {
  return (
    <div className="review">
      <div className="img-review center">
        <img src={image} alt={user} title={user} />
      </div>
      <p className="review-user center">{user}</p>
      <div className="review-rate center">
        <StarIcon avgRate={4} id={1} />
        <span className="center" style={{ marginBottom: -4 }}>
          <span className="user-rate">{rate}</span>
          <span className="five center">
            <span>/</span>5
          </span>
        </span>
      </div>

      <div className="user-review center">
        <span>
          <FaQuoteLeft className="icon" />
        </span>
        {review}
        <span>
          <FaQuoteRight className="icon" />
        </span>
      </div>
    </div>
  );
};

export default Review;
