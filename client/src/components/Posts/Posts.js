import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";

export default function Posts({ setCurrentId }) {
  const isLoadingPosts = useSelector((state) => state.loadingPosts);

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
    <div className="flex justify-evenly flex-wrap items-center">
      {posts &&
        posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
    </div>
  );
}
