"use client";
import Link from "next/link";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";
const Navbar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between items-center">
      <Link href="/" className="font-bold text-gray-700 sm:text-2xl">
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        <div className="flex">
          {data ? (
            <button
              onClick={signout}
              className="bg-blue-400 text-white border p-1 px-4 rounded mr-3 text-sm sm:text-base"
            >
              Logout
            </button>
          ) : (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
