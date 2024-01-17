import React from "react";
import useStyles from "./styles";
import {
  Avatar,
  Button,
  Card,
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

const Post = ({ post, setCurrentId }) => {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: "red" }} aria-label="creator">
            {post.name[0]}
          </Avatar>
        }
        action={
          isCreator && (
            <IconButton
              aria-label="edit"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={post.title}
        subheader={moment(post.createdAt).fromNow()}
      />
      <CardMedia
        sx={{ height: 240 }}
        image={post.selectedFile}
        title={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {post.message}
        </Typography>
        <Stack mt={2} spacing={1} direction={"row"}>
          {post.tags.map((tag, index) => (
            <Chip
              label={`#${tag} `}
              color="primary"
              sx={{ fontFamily: "monospace" }}
              key={index}
            />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          onClick={() => handleLikePost(post._id)}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hasLiked ? (
            <ThumbUpIcon fontSize="small" color="primary" />
          ) : (
            <ThumbUpOutlinedIcon fontSize="small" color="primary" />
          )}
          <Typography variant="body2">{post.likes.length}</Typography>
        </Button>
        {isCreator && (
          <Button
            size="small"
            color="primary"
            onClick={() => handleDeletePost(post._id)}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
