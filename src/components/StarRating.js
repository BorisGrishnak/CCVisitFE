import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              style={{display: "none"}}
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <IoMdStar
              key={i}
              className="star mx-5"
              size={100}
              color={ratingValue <= (hover || rating) ? "#FDCD04" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>Rating is: {rating}</p>
    </div>
  );
};

export default StarRating;
