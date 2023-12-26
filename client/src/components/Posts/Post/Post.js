import React from "react";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { deletePost, likePost } from "../../../actions/post";
import { useDispatch, useSelector } from "react-redux";

export default function Post({ post, setCurrentId }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.authState);

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleLikePost = (id) => {
    if (isLoggedIn) {
      dispatch(likePost(id));
    } else {
      console.log("Please Sign In Order to like other posts.");
    }
  };

  const isLoggedIn = user ? true : false;

  const hasLiked = isLoggedIn && post.likes.includes(user._id);

  const isCreator = isLoggedIn && String(post.creator) === user._id;

  const maxLength = 197;

  if (post.message.length > maxLength) {
    post.message = post.message.substring(0, maxLength) + "...";
  }

  return (
    <div className="w-64 rounded-md overflow-hidden shadow-lg m-1 relative border-2 border-white">
      <img className="w-full opacity-80" src={post.selectedFile} alt="post" />
      <div className="absolute top-1 left-3 text-white">
        <div className="text-base font-bold">{post.name}</div>
        <div className="text-xs font-semibold">
          {moment(post.createdAt).fromNow()}
        </div>
      </div>
      <div className="p-2">
        <div className="font-bold text-lg mb-1">{post.title}</div>
        <p className="text-gray-700 text-sm">{post.message}</p>
        <div className="flex justify-between items-center p-1">
          <div className="flex flex-col p-1.5 m-1 justify-center items-center text-xs bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300">
            <button onClick={() => handleLikePost(post._id)}>
              {hasLiked ? (
                <ThumbUpIcon fontSize="small" />
              ) : (
                <ThumbUpOutlinedIcon fontSize="small" />
              )}
              <p className="text-xs">{post.likes.length}</p>
            </button>
          </div>
          <div className="flex justify-center items-center">
            {isCreator && (
              <>
                <button className="p-1.5 m-1 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 ">
                  <EditNoteIcon
                    fontSize="small"
                    onClick={() => setCurrentId(post._id)}
                  />
                </button>
                <button className="p-1.5 m-1  bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300">
                  <DeleteIcon
                    fontSize="small"
                    onClick={() => handleDeletePost(post._id)}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-2">
        {post.tags.map((tag, index) => {
          return (
            <span
              className="inline-block bg-blue-500 rounded-full px-2 py-1 text-xs text-gray-700 mr-1 mb-1"
              key={index}
            >
              #{tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
