import { Item, PrismaClient } from "@prisma/client";
import RestaurantNavbar from "../components/RestaurantNavbar";
import Menu from "./components/Menu";
import prisma from "../../../../lib/prisma";
const fetchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error();
  }
  return restaurant.items;
};
const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
  const menu = await fetchRestaurantMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  );
};

export default RestaurantMenu;
