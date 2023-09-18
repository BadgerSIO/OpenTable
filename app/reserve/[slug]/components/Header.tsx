import {
  convertToDisplayTime,
  Time,
} from "../../../utils/convertToDisplayTime";
import { format } from "date-fns";
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
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-20 rounded object-cover" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(day), "ccc, LLLL d")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
