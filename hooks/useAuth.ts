import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          email,
          password,
        }
      );
      setAuthState({
        loading: false,
        error: null,
        data: response.data,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.errorMessage,
        data: null,
      });
    }
  };
  // signup --------------------
  const signup = async (
    {
      firstName,
      lastName,
      email,
      phone,
      city,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          firstName,
          lastName,
          email,
          phone,
          city,
          password,
        }
      );
      setAuthState({
        loading: false,
        error: null,
        data: response.data,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.errorMessage,
        data: null,
      });
    }
  };
  // signout -------------------
  const signout = () => {
    deleteCookie("jwt");
    setAuthState({
      error: null,
      data: null,
      loading: false,
    });
  };
  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
