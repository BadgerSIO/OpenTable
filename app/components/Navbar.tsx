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
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        {loading ? null : (
          <div className="flex">
            {data ? (
              <button
                onClick={signout}
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
              >
                Logout
              </button>
            ) : (
              <>
                <AuthModal isSignIn={true} isSignUp={false} />
                <AuthModal isSignIn={false} isSignUp={true} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
