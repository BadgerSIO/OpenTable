import { Review } from "@prisma/client";

const calculateAvgReviews = (reviews: Review[]) => {
  if (!reviews.length) return 0;
  return (
    reviews.reduce((sum, review) => review.rating + sum, 0) / reviews.length
  ).toFixed(1);
};

export default calculateAvgReviews;
