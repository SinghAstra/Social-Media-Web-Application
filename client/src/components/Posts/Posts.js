import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import useStyles from "./styles";

export default function Posts({ setCurrentId }) {
  const isLoadingPosts = useSelector((state) => state.loadingPosts);

  const classes = useStyles();

  const posts = useSelector((state) => {
    return state.posts;
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
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={1}
    >
      {posts &&
        posts.map((post) => {
          return (
            <Grid key={post._id} item xs={12} sm={6} md={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          );
        })}
    </Grid>
  );
}
