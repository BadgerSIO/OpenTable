import { PRICE, PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";
import CardRestaurant from "./components/CardRestaurant";
import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
const fetchRestaurantsByCity = async (searchParams: {
  city: string;
  cuisine?: string;
  price?: PRICE;
}) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    slug: true,
    location: true,
    cuisine: true,
    reviews: true,
  };
  if (!searchParams.city)
    return prisma.restaurant.findMany({
      where: {
        cuisine: {
          name: {
            equals: searchParams.cuisine,
          },
        },
        price: {
          equals: searchParams.price,
        },
      },
      select,
    });
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: searchParams.city.toLowerCase(),
        },
      },
      cuisine: {
        name: {
          equals: searchParams.cuisine,
        },
      },
      price: {
        equals: searchParams.price,
      },
    },
    select,
  });
};

const fetchRegions = async () => {
  const regions = await prisma.location.findMany();
  return regions;
};
const fetchCuisine = async () => {
  const cuisine = prisma.cuisine.findMany();
  return cuisine;
};
const Search = async ({
  searchParams,
}: {
  searchParams: { city: string; cuisine?: string; price?: PRICE };
}) => {
  const restaurants = await fetchRestaurantsByCity(searchParams);
  const regions = await fetchRegions();
  const cuisine = await fetchCuisine();
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          regions={regions}
          cuisines={cuisine}
          searchParams={searchParams}
        />
        <div className="w-5/6 pl-5">
          {restaurants?.length ? (
            restaurants.map((restaurant) => (
              <CardRestaurant key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>No restaurant found in this location</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
