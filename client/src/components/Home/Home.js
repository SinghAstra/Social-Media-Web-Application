import React, { useEffect, useMemo, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import PaginationComp from "../Pagination/PaginationComp";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllPost, fetchPostBySearch } from "../../actions/post";
import { Grid } from "@mui/material";

// The Home component serves as the main landing page of the application,
// displaying a grid of posts along with search and pagination functionalities.

const Home = () => {
  // State to track the currently selected post to be updated.
  const [currentId, setCurrentId] = useState(null);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Access the current URL location
  const location = useLocation();

  // Memoize search parameters for improved performance
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  // Extract the page number from search parameters, default to 1 if not present
  const page = searchParams.get("page") || 1;

  // Fetch posts based on the URL path and search parameters
  useEffect(() => {
    if (location.pathname === "/posts/search") {
      const search = searchParams.get("search") || "";
      const tags = searchParams.get("tags") || "";
      dispatch(fetchPostBySearch({ search, tags, page }));
    } else {
      dispatch(fetchAllPost(page));
    }
  }, [dispatch, location, page, searchParams]);

  // Render the Home component with a responsive grid layout
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", lg: "row" },
      }}
    >
      <Grid item xs={12} lg={9}>
        <Posts setCurrentId={setCurrentId} />
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        {/* Search Form for filtering posts */}
        <Search initialSearch={location.search} />

        {/* Form for creating or updating posts */}
        <Form currentId={currentId} setCurrentId={setCurrentId} />

        {/* Pagination component for navigating through posts */}
        <PaginationComp page={page} />
      </Grid>
    </Grid>
  );
};

export default Home;
