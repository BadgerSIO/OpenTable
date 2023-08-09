import HeaderHome from "./components/HeaderHome";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
const prisma = new PrismaClient();
export interface IRestaurant {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
}
const fetchRestaurants = async (): Promise<IRestaurant[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      price: true,
      cuisine: true,
      location: true,
      reviews: true,
    },
  });
  return restaurants;
};
export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <HeaderHome />
      <div className="grid grid-cols-fluid p-5 gap-5 ">
        {restaurants?.map((restaurant) => (
          <RestaurantCard restaurant={restaurant} key={restaurant.id} />
        ))}
      </div>
    </main>
  );
}
