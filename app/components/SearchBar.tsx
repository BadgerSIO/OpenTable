"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const handleSearch = () => {
    if (location === "") return router.push(`/search?city=`);
    router.push(`/search?city=${location}`);
    setLocation("");
  };
  return (
    <div className="text-left text-lg py-3 m-auto flex flex-col md:flex-row justify-center max-w-[500px] lg:max-w-[700px] w-[80vw] gap-3">
      <input
        className="rounded p-2 w-full text-base"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="rounded bg-red-600 px-9 py-2 text-white whitespace-nowrap text-sm sm:text-base"
      >
        Let's go
      </button>
    </div>
  );
};

export default SearchBar;
