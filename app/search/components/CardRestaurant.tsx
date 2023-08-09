import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Stars from "../../components/Stars";
import calculateAvgReviews from "../../utils/calculateAvgReviews";
import Price from "./Price";

interface IRestaurantByCity {
  id: number;
  name: string;
  main_image: string;
  price: PRICE;
  slug: string;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
}
const CardRestaurant = ({ restaurant }: { restaurant: IRestaurantByCity }) => {
  const { name, price, location, cuisine, main_image, slug, reviews } =
    restaurant;
  const renderReviewTxt = () => {
    const ratingAvg = calculateAvgReviews(reviews);
    if (ratingAvg >= 4) {
      return "Awesome";
    } else if (ratingAvg >= 2 && ratingAvg < 4) {
      return "Good";
    } else if (ratingAvg > 0 && ratingAvg < 2) {
      return "Average";
    } else return "No ratings";
  };
  return (
    <div className="border-b flex pb-5">
      <div>
        <Image
          src={main_image}
          alt=""
          width={300}
          height={300}
          className="w-44 h-36 object-cover rounded"
        />
      </div>
      <div className="pl-5  relative ">
        <div className="">
          <h2 className="text-2xl">{name}</h2>
          <div className="flex items-center">
            <Stars reviews={reviews} />
            <p className="ml-2 text-sm">{renderReviewTxt()}</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <Price price={price} />
              <p className="mr-4">{cuisine?.name}</p>
              <p className="mr-4">{location?.name}</p>
            </div>
          </div>
        </div>

        <Link
          href={`/restaurant/${slug}`}
          className=" p-2 inline-block absolute bottom-0 hover:text-white rounded text-xs border hover:bg-red-500 text-red-500 border-red-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CardRestaurant;
