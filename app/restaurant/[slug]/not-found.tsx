"use client";
import Image from "next/image";

import errmascot from "../../../public/icons/error.png";

const Error = ({ error }: { error: Error }) => {
  return (
    <div className="absolute h-screen w-full top-0 left-0 flex flex-col justify-center bg-sky-50 items-center">
      <Image
        src={errmascot}
        alt=""
        width={600}
        height={600}
        className="w-96 inline-block"
      />
      <div className="bg-white py-5 px-5 rounded-xl text-center">
        <h2 className="text-5xl  ">404</h2>
        <p className="text-red-500 animate-pulse text-xl ">
          Restaurant Not found
        </p>
      </div>
    </div>
  );
};

export default Error;
