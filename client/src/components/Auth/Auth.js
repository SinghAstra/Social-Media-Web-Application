import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

const Auth = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [isSignUp, setIsSignUp] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const renderFormFields = (
    values,
    handleChange,
    handleBlur,
    touched,
    errors
  ) => {
    return (
      <>
        {isSignUp && (
          <>
            <TextField
              size="small"
              fullWidth
              id="firstName"
              label="First Name"
              variant="outlined"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.firstName && touched.firstName}
              helperText={
                errors.firstName && touched.firstName && errors.firstName
              }
            />
            <TextField
              size="small"
              fullWidth
              id="lastName"
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lastName && touched.lastName}
              helperText={
                errors.lastName && touched.lastName && errors.lastName
              }
            />
          </>
        )}
        <TextField
          size="small"
          fullWidth
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email}
        />
        <TextField
          size="small"
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password && touched.password}
          helperText={errors.password && touched.password && errors.password}
        />
        {isSignUp && (
          <TextField
            size="small"
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword && touched.confirmPassword}
            helperText={
              errors.confirmPassword &&
              touched.confirmPassword &&
              errors.confirmPassword
            }
          />
        )}
      </>
    );
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);

    if (isSignUp) {
      dispatch(signUpUser(values, navigate));
    } else {
      dispatch(
        signInUser({ email: values.email, password: values.password }, navigate)
      );
    }
  };

  return (
    <div className="flex flex-col bg-white items-center justify-center px-3 py-8 mx-auto w-80  rounded-lg shadow">
      <div>
        <h1 className="text-xl  font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl text-center mb-2">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={
            isSignUp ? signUpValidationSchema : signInValidationSchema
          }
          onSubmit={onSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;
            return (
              <form className="space-y-3" onSubmit={handleSubmit}>
                {renderFormFields(
                  values,
                  handleChange,
                  handleBlur,
                  touched,
                  errors
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>
            );
          }}
        </Formik>

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
