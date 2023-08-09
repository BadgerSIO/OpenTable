"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress, LinearProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  transition: "all 0.5s ease",
};

export default function AuthModal({
  isSignIn,
  isSignUp,
}: {
  isSignIn: boolean;
  isSignUp: boolean;
}) {
  const [disabled, setDisabled] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const { error, loading, data } = React.useContext(AuthenticationContext);
  const { signin, signup } = useAuth();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignIn ? signinContent : signupContent;
  };
  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  React.useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
      return setDisabled(true);
    }
    if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.city &&
      inputs.email &&
      inputs.password &&
      inputs.phone
    ) {
      return setDisabled(false);
    }
    setDisabled(true);
  }, [inputs]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignIn) {
      return signin(
        { email: inputs.email, password: inputs.password },
        handleClose
      );
    } else {
      return signup({
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email,
        phone: inputs.phone,
        city: inputs.city,
        password: inputs.password,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${renderContent(
          "bg-blue-400 text-white ",
          ""
        )} border p-1 px-4 rounded mr-3`}
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
            <div className="w-[450px] min-h-[500px] bg-white flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="w-[450px] min-h-[500px] bg-white rounded p-10">
              {error && (
                <Alert className="mb-5" severity="error">
                  {error}
                </Alert>
              )}
              <h1 className="font-semibold text-lg uppercase text-center border-b border-gray-200 text-slate-900 pb-5 mb-5">
                {renderContent("Sign in", "Sign Up")}
              </h1>

              <p className="text-2xl text-center">
                {renderContent(
                  "Login to you account",
                  "Create your opentable account"
                )}
              </p>
              <form className="mt-10" onSubmit={handleAuth}>
                <AuthModalInputs
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  isSignIn={isSignIn}
                />
                <button
                  disabled={disabled}
                  className="bg-red-600 py-3 w-full px-5 rounded text-white uppercase disabled:bg-gray-500 hover:bg-red-700"
                >
                  {renderContent("Login", "signup")}
                </button>
              </form>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
