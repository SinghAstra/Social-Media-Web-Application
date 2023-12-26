import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import FileBase64 from "react-file-base64";
import { MuiChipsInput } from "mui-chips-input";
import { TextField } from "@mui/material";

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
    if (currentId) {
      dispatch(updatePost({ ...formData, name: user?.name }));
      setCurrentId(null);
    } else {
      dispatch(createPost({ ...formData, name: user?.name }));
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
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setFormData({
                  ...formData,
                  selectedFile: base64,
                });
              }}
            />
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
