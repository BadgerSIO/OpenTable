import React from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}
const AuthModalInputs = ({ inputs, handleInputChange, isSignIn }: Props) => {
  return (
    <>
      {isSignIn ? null : (
        <div className="flex justify-between gap-5 capitalize">
          <input
            type="text"
            className="w-[49%] px-5 py-2 border border-gray-200 focus:border-sky-600 outline-none rounded placeholder:capitalize"
            placeholder="first name"
            onChange={(e) => handleInputChange(e)}
            name="firstName"
            value={inputs.firstName}
          />
          <input
            type="text"
            className="w-[49%] px-5 py-2 border border-gray-200 focus:border-sky-600 outline-none rounded placeholder:capitalize"
            placeholder="last name"
            onChange={(e) => handleInputChange(e)}
            name="lastName"
            value={inputs.lastName}
          />
        </div>
      )}
      <div className="flex justify-between gap-5 my-5">
        <input
          type="email"
          className="w-full px-5 py-2 border border-gray-200 focus:border-sky-600 outline-none rounded placeholder:capitalize"
          placeholder="your email"
          onChange={(e) => handleInputChange(e)}
          name="email"
          value={inputs.email}
        />
      </div>
      {isSignIn ? null : (
        <div className="flex justify-between gap-5 mb-5">
          <input
            type="tel"
            className="w-[49%] px-5 py-2 border border-gray-200 focus:border-sky-600 outline-none rounded placeholder:capitalize"
            placeholder="Phone"
            onChange={(e) => handleInputChange(e)}
            name="phone"
            value={inputs.phone}
          />
          <input
            type="text"
            className="w-[49%] px-5 py-2 border border-gray-200 focus:border-sky-600 outline-none rounded placeholder:capitalize"
            placeholder="your address"
            onChange={(e) => handleInputChange(e)}
            name="city"
            value={inputs.city}
          />
        </div>
      )}
      <div className="flex justify-between gap-5 mb-[30px]">
        <input
          type="password"
          className="w-full px-5 py-2 border border-gray-200 focus:border-sky-600 outline-none rounded placeholder:capitalize"
          placeholder="your password"
          onChange={(e) => handleInputChange(e)}
          name="password"
          value={inputs.password}
        />
      </div>
    </>
  );
};

export default AuthModalInputs;
