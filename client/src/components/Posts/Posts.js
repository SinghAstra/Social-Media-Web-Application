import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import LoadingPostSkelton from "./Post/LoadingPostSkelton";
import { Grid } from "@mui/material";

// Component responsible for rendering a list of posts
const Posts = ({ setCurrentId }) => {
  // Check if posts are currently being loaded
  const isLoadingPosts = useSelector((state) => state.loadingPosts);

  // Retrieve posts from the Redux store
  const posts = useSelector((state) => state.posts.posts);

  // Render loading skeletons while posts are being loaded
  if (isLoadingPosts) {
    return (
      <Grid container spacing={1} alignItems="stretch" sx={{ padding: 2 }}>
        {/* Render loading skeletons 8 times */}
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} xl={3}>
            <LoadingPostSkelton />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Render actual posts once loading is complete
  return (
    <Grid container alignItems="stretch" spacing={1} sx={{ padding: 2 }}>
      {/* Map through the posts and render each post component */}
      {posts &&
        posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4} xl={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Posts;
