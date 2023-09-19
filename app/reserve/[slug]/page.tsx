import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import { BookingProvider } from "../../context/bookingContext";
import Form from "./components/Form";
import Header from "./components/Header";
const fetchRestaurantBySlug = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
  });
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};
const Reservation = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  return (
    <BookingProvider>
      <div className="border-t h-screen">
        <div className="py-9 w-full max-w-[700px] m-auto px-5">
          <Header
            image={restaurant?.main_image}
            name={restaurant?.name}
            reserveDate={searchParams.date}
            partySize={searchParams.partySize}
          />
          <Form
            slug={params.slug}
            date={searchParams.date}
            partySize={searchParams.partySize}
          />
        </div>
      </div>
    </BookingProvider>
  );
};

export default Reservation;
