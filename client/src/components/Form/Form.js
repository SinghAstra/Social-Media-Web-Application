import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import { MuiChipsInput } from "mui-chips-input";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@emotion/styled";

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

export default function Form({ currentId, setCurrentId }) {
  const user = useSelector((state) => state.auth.authState);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  const clearFormData = () => {
    setFormData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataObject = new FormData();
    formDataObject.append("title", formData.title);
    formDataObject.append("message", formData.message);
    formDataObject.append("name", user?.name);
    formData.tags.forEach((tag, index) => {
      formDataObject.append(`tags[${index}]`, tag);
    });
    formDataObject.append("selectedFile", formData.selectedFile);
    if (currentId) {
      dispatch(updatePost(formDataObject));
      setCurrentId(null);
    } else {
      dispatch(createPost(formDataObject));
    }
    clearFormData();
  };

  useEffect(() => {
    if (currentId) {
      const currentPost = posts.find((post) => post._id === currentId);
      setFormData(currentPost);
    }
  }, [currentId, posts]);

  const handleAddTag = (tag) => {
    setFormData({
      ...formData,
      tags: [...formData.tags, tag],
    });
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
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

  if (!user) {
    return (
      <div className="w-72 lg:w-64 bg-white shadow-md rounded h-fit font-semibold text-left p-6">
        <h1>
          Please Sign In in order to create your post and like other posts.
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="w-72 lg:w-64  bg-white shadow-lg rounded p-2">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <h1 className="text-center text-base font-semibold">
              {currentId ? "Edit" : "Create"} a Post
            </h1>
          </div>
          <div className="mb-4">
            <TextField
              size="small"
              fullWidth
              inputProps={{ style: Styles.input }}
              InputLabelProps={{ style: Styles.label }}
              id="title"
              label="Title"
              variant="outlined"
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="mb-4">
            <TextField
              size="small"
              fullWidth
              inputProps={{ style: Styles.input }}
              InputLabelProps={{ style: Styles.label }}
              id="message"
              label="Message"
              variant="outlined"
              value={formData.message}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  message: e.target.value,
                });
              }}
              required
            />
          </div>
          <div className="mb-4 ">
            <MuiChipsInput
              placeholder="Tags (Type and Press Enter)"
              fullWidth
              inputProps={{ style: Styles.input }}
              InputLabelProps={{ style: Styles.label }}
              size="small"
              label="Tags"
              variant="outlined"
              value={formData.tags}
              onAddChip={handleAddTag}
              onDeleteChip={handleDeleteTag}
              hideClearAll
              disableEdition
              disableDeleteOnBackspace
            />
          </div>

          <div className="mb-6">
            <Button
              component="label"
              variant="contained"
              sx={{ width: "100%" }}
              value={formData.selectedFile}
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFormData({ ...formData, selectedFile: e.target.files[0] });
                }
              }}
              startIcon={<CloudUploadIcon />}
            >
              Upload Image
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 mb-2 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SUBMIT
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={clearFormData}
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
