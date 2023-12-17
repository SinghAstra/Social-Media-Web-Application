import React from "react";
import Post from "./Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllPost } from "../../actions/post";

export default function Posts({setCurrentId}) {
  const posts = useSelector(state=>{
    return state.post
  })

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchAllPost())
  },[dispatch])
  return (
    <div className="flex justify-center flex-wrap items-center">
      {posts&&posts.map(post=><Post key={post._id} post={post} setCurrentId={setCurrentId}/>)}
    </div>
  );
}
