import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import PaginationComp from "../Pagination/PaginationComp";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllPost, fetchPostBySearch } from "../../actions/post";
import { Grid } from "@mui/material";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    if (location.pathname === "/posts/search") {
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";
      const tags = searchParams.get("tags") || "";
      dispatch(fetchPostBySearch({ search, tags }));
    } else {
      dispatch(fetchAllPost(page));
    }
  }, [dispatch, location, page]);

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
          justifyContent: "top",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Search initialSearch={location.search} />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
        <PaginationComp page={page} />
      </Grid>
    </Grid>
  );
};

export default Home;
