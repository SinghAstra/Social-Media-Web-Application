import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import { MuiChipsInput } from "mui-chips-input";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";

// Styled component for visually hidden input
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Yup validation schema for form fields
const postValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
  tags: Yup.array().min(1, "At least one tag is required"),
  selectedFile: Yup.mixed().required("Image is required"),
});

// FileInput component for handling file uploads
const FileInput = ({
  setFieldValue,
  selectedFileName,
  setSelectedFileName,
}) => {
  return (
    <Button
      component="label"
      variant="contained"
      sx={{ width: "100%" }}
      startIcon={<CloudUploadIcon />}
      onChange={(e) => {
        setSelectedFileName(e.target.files[0]?.name || "");
        setFieldValue("selectedFile", e.target.files[0]);
      }}
    >
      {selectedFileName ? `File Selected: ${selectedFileName}` : "Upload Image"}
      <VisuallyHiddenInput type="file" name="selectedFile" />
    </Button>
  );
};

// Component for displaying a message to unauthorized users
const UnauthorizedUserMessage = () => {
  return (
    <div className="w-72 lg:w-64 bg-white shadow-md rounded h-fit font-semibold text-left p-6">
      <h1>Please Sign In in order to create your post and like other posts.</h1>
    </div>
  );
};

// Main Form component
export default function Form({ currentId, setCurrentId }) {
  // Retrieve user and posts data from Redux store
  const user = useSelector((state) => state.auth.authState);
  const posts = useSelector((state) => state.posts.posts);

  // State for tracking selected file name
  const [selectedFileName, setSelectedFileName] = useState("");

  // Initial form data
  const initialFormData = {
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  };

  // State to manage form data
  const [formData, setFormData] = useState(initialFormData);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Form submit handler
  const handleFormSubmit = (values, { resetForm }) => {
    const formDataObject = new FormData();
    formDataObject.append("title", values.title);
    formDataObject.append("message", values.message);
    formDataObject.append("name", user?.name);
    values.tags.forEach((tag) => {
      formDataObject.append(`tags`, tag);
    });
    formDataObject.append("selectedFile", values.selectedFile);
    if (currentId) {
      dispatch(updatePost(formDataObject, currentId));
      setCurrentId(null);
    } else {
      dispatch(createPost(formDataObject));
    }
    setFormData(initialFormData);
    resetForm();
    setSelectedFileName("");
  };

  // Effect to populate form data when currentId changes
  useEffect(() => {
    if (currentId) {
      const currentPost = posts.find((post) => post._id === currentId);
      setFormData(currentPost);
    }
  }, [currentId, posts]);

  // If user is not authenticated, display a message
  if (!user) {
    return <UnauthorizedUserMessage />;
  }

  // Main JSX for the form
  return (
    <div>
      <div className="w-72 lg:w-64  bg-white shadow-lg rounded p-2">
        <Formik
          initialValues={formData}
          validationSchema={postValidationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              handleReset,
            } = props;
            return (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <h1 className="text-center text-base font-semibold">
                  {currentId ? "Edit" : "Create"} a Post
                </h1>
                <TextField
                  size="small"
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.title && touched.title}
                  helperText={errors.title && touched.title && errors.title}
                />
                <TextField
                  size="small"
                  fullWidth
                  id="message"
                  name="message"
                  label="Message"
                  variant="outlined"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.message && touched.message}
                  helperText={
                    errors.message && touched.message && errors.message
                  }
                />
                <MuiChipsInput
                  placeholder="Tags (Type and Press Enter)"
                  fullWidth
                  size="small"
                  label="Tags"
                  name="tags"
                  variant="outlined"
                  value={values.tags}
                  onChange={(chips) => setFieldValue("tags", chips)}
                  onBlur={handleBlur}
                  error={!!(touched.tags && errors.tags)}
                  helperText={errors.tags && touched.tags && errors.tags}
                  hideClearAll
                  disableEdition
                  disableDeleteOnBackspace
                />
                <FileInput
                  setSelectedFileName={setSelectedFileName}
                  selectedFileName={selectedFileName}
                  setFieldValue={setFieldValue}
                />
                {errors.selectedFile && touched.selectedFile && (
                  <div className="text-red-500 pl-2">{errors.selectedFile}</div>
                )}
                <button
                  className="bg-blue-500 hover:bg-blue-700 mb-2 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  SUBMIT
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleReset}
                >
                  CLEAR
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
