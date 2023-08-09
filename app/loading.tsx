import React from "react";

const Loading = () => {
  return (
    <div className="h-screen">
      <div className="h-[30vh] bg-slate-200 animate-pulse"></div>
      <div className="grid grid-cols-fluid p-5 gap-5">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="w-72 h-72 bg-gray-200 rounded border animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
