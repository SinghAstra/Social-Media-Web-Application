import React, { useState } from "react";
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { logInAction } from "../actions/authActions";

const LogIn = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialFormData = {
    email: "",
    password: "",
  };

  const LogInValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
  });

  const handleFormSubmit = (values, { resetForm }) => {
    dispatch(logInAction(values));
    resetForm();
  };

  return (
    <div className="flex h-screen font-mono items-center justify-center">
      <div className="flex flex-1 h-full justify-evenly flex-col items-center">
        <div className="flex items-center justify-center flex-col gap-2">
          <h1 className="text-3xl font-semibold text-blue-300">Log In</h1>
          <p className="text-slate-400 text-xl">Welcome back 😇 </p>
        </div>
        <Formik
          initialValues={initialFormData}
          validationSchema={LogInValidationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {(props) => {
            const { values, errors, handleChange, handleSubmit } = props;
            return (
              <form
                className="flex flex-col gap-4 w-2/3 items-center"
                onSubmit={handleSubmit}
              >
                <div className="w-full">
                  <div className="relative w-full">
                    <div
                      className="absolute top-0 bottom-0 left-0 pl-3  
                      flex items-center  
                      pointer-events-none"
                    >
                      <EmailOutlined />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      className="bg-transparent pl-10 pr-4 py-2 border rounded-lg w-full"
                    />
                  </div>
                  {errors.email && (
                    <p className=" mt-2 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="w-full">
                  <div className="relative w-full">
                    <div
                      className="absolute top-0 bottom-0 right-0 pr-3  
                      flex items-center  
                      cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      id="password"
                      className="bg-transparent pr-10 pl-4 py-2 border rounded-lg w-full"
                      value={values.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && (
                    <p className=" mt-2 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <button
                  className="bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded w-full"
                  type="submit"
                >
                  Log In
                </button>
              </form>
            );
          }}
        </Formik>

        <Link to={"/auth/sign-up"}>
          <p className="hover:text-blue-300 cursor-pointer hover:underline ">
            New User ? Sign Up
          </p>
        </Link>
      </div>
      <div className="flex-1 bg-blue-400 h-full items-center justify-center flex relative">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/signUp.png`}
          className="absolute bottom-0"
          alt="log-in"
        />
      </div>
    </div>
  );
};

export default LogIn;
