import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

export default function Posts({ setCurrentId }) {
  const posts = useSelector((state) => {
    return state.posts;
  });

  return (
    <div className="flex justify-evenly flex-wrap items-center">
      {posts &&
        posts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
    </div>
  );
}
