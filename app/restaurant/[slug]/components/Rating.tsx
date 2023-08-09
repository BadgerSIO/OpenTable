import { Review } from "@prisma/client";
import React from "react";
import Stars from "../../../components/Stars";
import calculateAvgReviews from "../../../utils/calculateAvgReviews";

const Rating = ({ reviews }: { reviews: Review[] }) => {
  const averageRating = calculateAvgReviews(reviews);

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>
          <Stars reviews={reviews} />
        </p>
        <p className="text-reg ml-3">{averageRating}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length} Review{reviews.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default Rating;
