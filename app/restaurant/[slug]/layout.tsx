import React from "react";
import Header from "./components/Header";

const RestaurantLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex m-auto w-full xl:w-2/3 justify-center xl:justify-between -mt-11 gap-10 px-5 xl:px-0">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
