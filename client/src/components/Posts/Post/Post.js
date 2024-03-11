import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import { FaEllipsisVertical } from "react-icons/fa6";
import { showNotification } from "../../../actions/notifications";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.authState);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropDown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };

  const handleLikePost = (id) => {
    if (isLoggedIn) {
      dispatch(likePost(id));
    } else {
      dispatch(showNotification("Please sign in to like the post", "info"));
    }
  };

  const isLoggedIn = user ? true : false;

  const hasLiked = isLoggedIn && post.likes.includes(user._id);

  const isCreator = isLoggedIn && String(post.creator) === user._id;

  return (
    <div className="max-w-md bg-yellow-400 w-full rounded-md m-2 shadow-md shadow-black py-2 px-4">
      <div className="flex justify-between items-center relative">
        <h1 className="text-xl font-medium">{post.title}</h1>
        <button className="text-black text-xl">
          <FaEllipsisVertical onClick={handleToggleDropDown} />
        </button>
        <div
          className={`bg-slate-800 cursor-pointer rounded-md text-white absolute top-6 right-1 shadow-md z-10 border border-gray-400  ${
            !showDropdown && "hidden"
          }`}
        >
          <ul className="divide-y divide-gray-500">
            {isCreator && (
              <li
                className="px-4 py-2 hover:bg-slate-600"
                onClick={() => setCurrentId(post._id)}
              >
                Edit
              </li>
            )}
            {isCreator && (
              <li
                className="px-4 py-2  hover:bg-slate-600"
                onClick={() => dispatch(handleDeletePost(post._id))}
              >
                Delete
              </li>
            )}
            <li className="px-4 py-2  hover:bg-slate-600">Save</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center relative">
        <img
          src={post.selectedFile}
          alt={post.title}
          onClick={() => handleLikePost(post._id)}
          className="cursor-pointer"
        />
        <div className="p-2 text-2xl absolute bottom-0 left-0">
          {hasLiked ? (
            <FaHeart
              className="cursor-pointer text-red-400"
              onClick={() => handleLikePost(post._id)}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer text-white"
              onClick={() => handleLikePost(post._id)}
            />
          )}
        </div>
      </div>

      <div className="flex justify-start items-center gap-2 mt-2">
        <div className="w-10 h-10 rounded-full cursor-pointer shadow-lg bg-white text-black flex items-center justify-center font-extrabold text-2xl border border-white">
          <Link to="/profile">{post.name[0]}</Link>
        </div>
        <div>
          <h1>{post.name}</h1>
          <p className="text-slate-400 text-sm">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-slate-600">{post.message}</p>
        {post.tags.map((tag) => (
          <span className="text-slate-500 mx-1">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Post;
