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
      <div className="bg-red-500 py-10 px-5 rounded-xl text-center">
        <p className="text-white animate-pulse text-xl font-bold">
          {error.message}
        </p>
      </div>
    </div>
  );
};

export default Error;
