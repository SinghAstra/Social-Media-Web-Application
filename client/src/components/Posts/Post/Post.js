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

  return (
    <div className="max-w-xs rounded-md overflow-hidden shadow-lg m-2 relative border-2 border-white">
      <img className="w-full opacity-80" src={post.selectedFile} alt="post" />
      <div className="absolute top-2 left-3 text-white">
        <div className="text-base font-bold">{post.name}</div>
        <div className="text-xs font-semibold">
          {moment(post.createdAt).fromNow()}
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.message}</p>
        <div className="flex justify-between items-center p-1">
          <div className="flex flex-col justify-center items-center p-1.5 m-1 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
            <button onClick={() => handleLikePost(post._id)}>
              {hasLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              <p>{post.likes.length}</p>
            </button>
          </div>
          <div className="flex justify-center items-center">
            {isCreator && (
              <>
                <button className="flex p-1.5 m-1 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                  <EditNoteIcon
                    className="h-5 w-5 text-white"
                    onClick={() => setCurrentId(post._id)}
                  />
                </button>
                <button className="flex p-1.5 m-1  bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                  <DeleteIcon
                    className="h-5 w-5 text-white"
                    onClick={() => handleDeletePost(post._id)}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {post.tags.map((tag, index) => {
          return (
            <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
