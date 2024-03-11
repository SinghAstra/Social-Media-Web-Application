import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import LoadingPostSkelton from "./Post/LoadingPostSkelton";

// Component responsible for rendering a list of posts
const Posts = ({ setCurrentId }) => {
  // Check if posts are currently being loaded
  const isLoadingPosts = useSelector((state) => state.loadingPosts);

  // Retrieve posts from the Redux store
  const posts = useSelector((state) => state.posts.posts);

  // Render loading skeletons while posts are being loaded
  if (isLoadingPosts) {
    return (
      <div className="flex flex-col w-full items-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingPostSkelton key={index} />
        ))}
      </div>
    );
  }

  // Render actual posts once loading is complete
  return (
    <div className="flex flex-col w-full items-center">
      {/* Map through the posts and render each post component */}
      {posts &&
        posts.map((post) => (
          <Post post={post} setCurrentId={setCurrentId} key={post._id} />
        ))}
    </div>
  );
};

export default Posts;
