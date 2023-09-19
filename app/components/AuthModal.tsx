"use client";
import { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  transition: "all 0.5s ease",
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const { error, loading, data } = useContext(AuthenticationContext);
  const { signin, signup } = useAuth();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignIn ? signinContent : signupContent;
  };
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.password &&
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleAuth = () => {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signup(
        {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          phone: inputs.phone,
          city: inputs.city,
          password: inputs.password,
        },
        handleClose
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          "bg-red-600 text-white ",
          ""
        )} border p-1 px-4 rounded mr-3 text-sm sm:text-base`}
      >
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="w-full min-w-[90vw] min-[490px]:min-w-[450px] min-h-[500px] bg-white flex justify-center items-center mx-auto">
              <CircularProgress />
            </div>
          ) : (
            <div className="w-full min-w-[90vw] min-[490px]:min-w-[450px] min-h-[500px] bg-white rounded p-5 md:p-10 mx-auto">
              {error && (
                <Alert className="mb-5" severity="error">
                  {error}
                </Alert>
              )}
              <h1 className="font-semibold text-lg uppercase text-center border-b border-gray-200 text-slate-900 pb-5 mb-5">
                {renderContent("Sign in", "Sign Up")}
              </h1>

              <p className="text-xl md:text-2xl text-center">
                {renderContent(
                  "Login to you account",
                  "Create your opentable account"
                )}
              </p>
              <div className="mt-10">
                <AuthModalInputs
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  isSignIn={isSignIn}
                />
                <button
                  onClick={handleAuth}
                  disabled={disabled}
                  className="bg-red-600 py-3 w-full px-5 rounded text-white uppercase disabled:bg-gray-500 hover:bg-red-700"
                >
                  {renderContent("Login", "signup")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
