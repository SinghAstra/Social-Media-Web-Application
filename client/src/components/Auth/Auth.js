import React, { useState } from "react";

const Auth = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("formData is ", formData);
    } else {
      console.log("formData is ", {
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                {isSignUp ? "Sign Up" : "Sign In"}
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {isSignUp && (
                  <>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        });
                      }}
                      required
                    />
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Last Name"
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
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  <input
                    type="confirm-password"
                    placeholder="Confirm Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-end">
                <button
                  onClick={toggleSignUp}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {isSignUp
                    ? ` Already have an account? Sign In`
                    : `Create a new account? Sign Up`}
                </button>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Auth;
