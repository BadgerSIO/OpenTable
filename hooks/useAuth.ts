import axios from "axios";
import { deleteCookie } from "cookies-next";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
const useAuth = () => {
  const { loading, error, data, setAuthState } = useContext(
    AuthenticationContext
  );
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
        `http://localhost:3000/api/auth/signin`,
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
      return response;
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.errorMessage,
        data: null,
      });
    }
  };
  // signup --------------------
  const signup = async ({
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
  }) => {
    setAuthState({
      loading: true,
      error: null,
      data: null,
    });
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
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
      console.log(response.data);
      return response;
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
