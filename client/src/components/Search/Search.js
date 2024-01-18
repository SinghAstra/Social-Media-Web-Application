import { TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostBySearch } from "../../actions/post";

const Search = ({ initialSearch }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSearchPost = () => {
    if (title.trim() || tags.length > 0) {
      dispatch(fetchPostBySearch({ search: title, tags: tags.join(",") }));
      navigate(
        `/posts/search?search=${title || ""}&tags=${
          tags.length > 0 ? tags.join(",") : ""
        }`
      );
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(initialSearch);
    const initialTitleValue = searchParams.get("search");
    const initialTagsValue = searchParams.get("tags");
    setTitle(initialTitleValue !== null ? initialTitleValue : "");
    setTags(
      initialTagsValue !== null && initialTagsValue !== ""
        ? initialTagsValue.split(",")
        : []
    );
  }, [initialSearch]);

  return (
    <div className="w-72 lg:w-64 bg-white shadow-md rounded p-2 mb-2">
      <div className="mb-1">
        <TextField
          size="small"
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="mb-2">
        <MuiChipsInput
          placeholder="Tags (Type and Press Enter)"
          fullWidth
          size="small"
          label="Tags"
          variant="outlined"
          value={tags}
          onAddChip={handleAddTag}
          onDeleteChip={handleDeleteTag}
          hideClearAll
          disableEdition
          disableDeleteOnBackspace
        />
      </div>
      <button
        onClick={handleSearchPost}
        className="bg-blue-500 hover:bg-blue-700 mb-2 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Search Post
      </button>
    </div>
  );
};

export default Search;
