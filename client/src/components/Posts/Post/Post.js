import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { showNotification } from "../../../actions/notifications";
import { Link } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  // Edit Post -> post._id
  // Time -> moment(post.createdAt).fromNow()
  // post.selectedFile
  // post.tags
  // post.title
  // component={Link} to={`/posts/${post._id}`}
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.authState);

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
      <h1 className="text-xl font-medium">{post.title}</h1>
      <div className="flex items-center justify-center">
        <img src={post.selectedFile} alt={post.title} />
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
