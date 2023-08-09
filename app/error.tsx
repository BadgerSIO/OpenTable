"use client";
import Image from "next/image";

import errmascot from "../public/icons/error.png";

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="h-[94vh] flex flex-col justify-center bg-sky-50 items-center">
      <Image
        src={errmascot}
        alt=""
        width={600}
        height={600}
        className="w-96 inline-block"
      />
      <div className="bg-white py-10 px-5 rounded-xl">
        <h1 className="text-2xl font-bold">My bad. An error occured!</h1>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default Error;
