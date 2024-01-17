import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const isLoadingPosts = useSelector((state) => state.loadingPosts);

  const posts = useSelector((state) => {
    return state.posts.posts;
  });

  if (isLoadingPosts) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <Grid sx={{ padding: "8px" }} container alignItems="stretch" spacing={1}>
      {posts &&
        posts.map((post) => {
          return (
            <Grid item key={post._id} xs={12} sm={6} md={4} xl={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Posts;
