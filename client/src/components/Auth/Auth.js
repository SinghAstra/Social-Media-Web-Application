import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";

const Auth = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password === formData.confirmPassword) {
        dispatch(signUpUser(formData, navigate));
      } else {
        setFormData({ ...formData, confirmPassword: "" });
      }
    } else {
      dispatch(signInUser(formData, navigate));
    }
  };

  const Styles = {
    input: {
      fontSize: 16,
      fontFamily: "monospace",
    },
    label: {
      fontSize: 16,
      fontFamily: "monospace",
    },
  };

  return (
    <div className="flex flex-col bg-white items-center justify-center px-3 py-8 mx-auto w-80  rounded-lg shadow">
      <div>
        <h1 className="text-xl  font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          {isSignUp && (
            <>
              <TextField
                size="small"
                fullWidth
                inputProps={{ style: Styles.input }}
                InputLabelProps={{ style: Styles.label }}
                id="firstName"
                label="First Name"
                variant="outlined"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  });
                }}
                required
              />
              <TextField
                size="small"
                fullWidth
                inputProps={{ style: Styles.input }}
                InputLabelProps={{ style: Styles.label }}
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  });
                }}
                required
              />
            </>
          )}
          <TextField
            size="small"
            fullWidth
            inputProps={{ style: Styles.input }}
            InputLabelProps={{ style: Styles.label }}
            id="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={(e) => {
              setFormData({
                ...formData,
                email: e.target.value,
              });
            }}
            required
          />
          <TextField
            size="small"
            fullWidth
            inputProps={{ style: Styles.input }}
            InputLabelProps={{ style: Styles.label }}
            id="password"
            label="Password"
            variant="outlined"
            value={formData.password}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value,
              });
            }}
            required
          />
          {isSignUp && (
            <TextField
              size="small"
              fullWidth
              inputProps={{ style: Styles.input }}
              InputLabelProps={{ style: Styles.label }}
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                });
              }}
              required
            />
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <button
          onClick={toggleSignUp}
          className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-2"
        >
          {isSignUp
            ? ` Already have an account? Sign In`
            : `Create a new account? Sign Up`}
        </button>
      </div>
    </div>
  );
};

export default Auth;
