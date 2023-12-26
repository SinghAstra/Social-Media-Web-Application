import { TextField } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostBySearch } from "../../actions/post";

const Search = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSearchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(fetchPostBySearch({ search, tags }));
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-72 lg:w-64 bg-white shadow-md rounded p-2 mb-2">
      <div className="mb-1">
        <TextField
          size="small"
          fullWidth
          inputProps={{ style: Styles.input }}
          InputLabelProps={{ style: Styles.label }}
          id="searchPost"
          label="Search Post"
          variant="outlined"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="mb-2">
        <MuiChipsInput
          placeholder="Tags (Type and Press Enter)"
          fullWidth
          inputProps={{ style: Styles.input }}
          InputLabelProps={{ style: Styles.label }}
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
        Search
      </button>
    </div>
  );
};

export default Search;
