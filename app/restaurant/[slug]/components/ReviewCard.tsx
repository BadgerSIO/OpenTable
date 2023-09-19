import { Review } from "@prisma/client";
import Stars from "../../../components/Stars";

const ReviewCard = ({ review }: { review: Review }) => {
  const { first_name, last_name, text, rating } = review;

  return (
    <div className="border-b pb-7 mb-7">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-1/6 flex sm:flex-col items-center gap-3">
          <div className="rounded-full bg-blue-400 min-w-[40px] h-10 sm:min-w-[64px] sm:h-16 flex items-center justify-center">
            <h2 className="text-white text-lg sm:text-2xl uppercase">
              {first_name[0] + last_name[0]}
            </h2>
          </div>
          <p className="text-center max-[639px]:whitespace-nowrap">
            {first_name} {last_name}
          </p>
        </div>
        <div className="w-5/6">
          <div className="flex items-center">
            <div className="flex mr-5">
              <Stars rating={rating} reviews={[]} />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm sm:text-base md:text-lg font-light">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
