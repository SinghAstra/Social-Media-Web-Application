import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import LoadingPostSkelton from "./Post/LoadingPostSkelton";
import { Grid } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const isLoadingPosts = useSelector((state) => state.loadingPosts);

  const posts = useSelector((state) => {
    return state.posts.posts;
  });

  if (isLoadingPosts) {
    return (
      <Grid container spacing={1} alignItems="stretch" sx={{ padding: "8px" }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <LoadingPostSkelton key={index} />
          </Grid>
        ))}
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
