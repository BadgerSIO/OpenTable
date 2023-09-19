import React from "react";

const Header = ({ name }: { name: string }) => {
  const renderTitle = () => {
    const nameArray = name.split("-");
    nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;
    return nameArray.join(" ");
  };
  return (
    <div className="h-40 sm:h-60 lg:h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center px-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-white capitalize text-shadow text-center">
          {renderTitle()}
        </h1>
      </div>
    </div>
  );
};

export default Header;
