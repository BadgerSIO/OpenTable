import Image from "next/image";
import React from "react";

const RestaurantImages = ({ images }: { images: string[] }) => {
  return (
    <div>
      <h1 className="font-bold text-lg sm:text-xl md:text-3xl mt-10 mb-7 border-b pb-5">
        {images?.length} photo{images?.length > 1 ? "s" : ""}
      </h1>
      <div className="flex flex-wrap">
        {images.map((image, i) => (
          <Image
            width={224}
            height={176}
            placeholder="blur"
            blurDataURL="../../../../public/images/placeholder-restaurant-photos.png"
            className="w-56 h-44 mr-1 mb-1"
            src={image}
            alt=""
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantImages;
