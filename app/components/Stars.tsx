import { Review } from "@prisma/client";
import fullStar from "../../public/icons/full-star.webp";
import halfStar from "../../public/icons/half-star.webp";
import emptyStar from "../../public/icons/empty-star.webp";
import calculateAvgReviews from "../utils/calculateAvgReviews";
import Image from "next/image";

const Stars = ({ reviews, rating }: { reviews: Review[]; rating?: number }) => {
  let avgRating = rating || calculateAvgReviews(reviews);

  const renderStar = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (typeof avgRating === "string") {
        avgRating = parseFloat(avgRating);
      }
      const diff = avgRating - i;
      if (diff >= 1) stars.push(fullStar);
      else if (diff < 1 && diff > 0) {
        if (diff <= 0.2) stars.push(emptyStar);
        else if (diff > 0.2 && diff <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }
    return stars.map((star, i) => {
      return (
        <Image
          key={i}
          height={12}
          width={12}
          src={star}
          alt=""
          className="w-3 h-3 mr-1"
        />
      );
    });
  };
  return (
    <span className="flex items-center justify-start">{renderStar()}</span>
  );
};

export default Stars;
