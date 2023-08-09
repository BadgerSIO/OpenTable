import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

const SearchSideBar = ({
  regions,
  cuisines,
  searchParams,
}: {
  regions: Location[];
  cuisines: Cuisine[];
  searchParams: { city: string; cuisine?: string; price?: PRICE };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$$",
      className: `border ${
        searchParams.price === "CHEAP" ? "bg-red-500 text-white" : ""
      } w-full text-center hover:bg-red-500 hover:text-white text-reg font-light rounded-l p-2`,
    },
    {
      price: PRICE.REGULAR,
      label: "$$$",
      className: `border-r border-t text-center ${
        searchParams.price === "REGULAR" ? "bg-red-500 text-white" : ""
      } hover:bg-red-500 hover:text-white border-b w-full text-reg font-light p-2`,
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$$",
      className: `border-r border-t ${
        searchParams.price === "EXPENSIVE" ? "bg-red-500 text-white" : ""
      } text-center hover:bg-red-500 hover:text-white border-b w-full text-reg font-light p-2 rounded-r`,
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {regions?.map((region) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: region.name,
              },
            }}
            key={region?.id}
          >
            <p
              className={`font-light ${
                searchParams.city === region.name ? "text-red-500" : ""
              } hover:text-red-500`}
            >
              {region?.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines?.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
          >
            <p
              className={`font-light ${
                searchParams.cuisine === cuisine.name ? "text-red-500" : ""
              } hover:text-red-500`}
            >
              {cuisine?.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map((price) => (
            <Link
              key={price.price}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price.price,
                },
              }}
              className={price.className}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
