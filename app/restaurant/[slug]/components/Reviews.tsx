import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-lg sm:text-xl md:text-3xl mt-10 mb-7 borber-b pb-5">
        What 100 people are saying
      </h1>
      <div>
        {reviews?.map((review) => (
          <ReviewCard key={review?.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
