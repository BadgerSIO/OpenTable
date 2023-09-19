import { Cuisine, PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
import Description from "./components/Description";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantImages from "./components/RestaurantImages";
import RestaurantNavbar from "./components/RestaurantNavbar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";
import prisma from "../../../lib/prisma";
interface IRestaurantBySlug {
  name: string;
  description: string;
  main_image: string;
  images: string[];
  slug: string;
  cuisine: Cuisine;
  reviews: Review[];
  open_time: string;
  close_time: string;
}

const fetchRestaurantBySlug = async (
  slug: string
): Promise<IRestaurantBySlug> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
      main_image: true,
      images: true,
      slug: true,
      cuisine: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <>
      <div className="bg-white w-full xl:w-[70%] rounded p-3 shadow border">
        <RestaurantNavbar slug={restaurant?.slug} />
        <Title name={restaurant?.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant?.description} />
        <RestaurantImages images={restaurant?.images} />
        <Reviews reviews={restaurant?.reviews} />
      </div>
      <ReservationCard
        openTime={restaurant?.open_time}
        closeTime={restaurant?.close_time}
        slug={restaurant?.slug}
      />
    </>
  );
};

export default RestaurantDetails;
