import {
  convertToDisplayTime,
  Time,
} from "../../../utils/convertToDisplayTime";
import { format } from "date-fns";
import AllMostDone from "./AllMostDone";
import Image from "next/image";
const Header = ({
  image,
  name,
  reserveDate,
  partySize,
}: {
  image: string;
  name: string;
  reserveDate: string;
  partySize: string;
}) => {
  const [day, time] = reserveDate.split("T");

  return (
    <div>
      <AllMostDone />
      <div className="mt-5 flex flex-col sm:flex-row gap-4">
        <Image
          width={128}
          height={80}
          src={image}
          alt=""
          className="w-32 h-20 rounded object-cover"
        />
        <div>
          <h1 className="text-xl lg:text-3xl font-bold">{name}</h1>
          <div className="flex mt-3 gap-6 text-sm md:text-base">
            <p className="hidden sm:block">
              {format(new Date(day), "ccc, LLLL d")}
            </p>
            <p className="sm:hidden">{format(new Date(day), "ccc, LLL d")}</p>
            <p>{convertToDisplayTime(time as Time)}</p>
            <p>
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
