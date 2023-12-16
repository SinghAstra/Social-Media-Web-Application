import React from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllPost } from "../../actions/post";

export default function Posts() {
  const posts = useSelector(state=>{
    return state.post.data
  })

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllPost())
  },[dispatch])
  return (
    <div className="flex justify-center flex-wrap items-center">
      {posts&&posts.map(post=><Post post={post}/>)}
    </div>
  );
}
