import Link from "next/link";
import { IRestaurant } from "../page";
import Price from "./Price";
import Stars from "./Stars";

interface Props {
  restaurant: IRestaurant;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link href={`/restaurant/${restaurant?.slug}`}>
      <div className="w-full rounded overflow-hidden border cursor-pointer">
        <img
          src={restaurant?.main_image}
          alt={restaurant?.name}
          className="w-full h-36"
        />
        <div className="p-3">
          <h3 className="font-bold text-2xl mb-1">{restaurant?.name}</h3>
          <div className="flex items-center">
            <div className="flex">
              <Stars reviews={restaurant.reviews} />
            </div>
            <p className="ml-2">{restaurant?.reviews?.length} reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant?.cuisine?.name}</p>
            <Price price={restaurant?.price} />
            <p>Toronto</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
