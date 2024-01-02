import React from "react";
import useStyles from "./styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const NewPost = ({ post, setCurrentId }) => {
  const classes = useStyles();
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
    <Card className={classes.card} sx={{ fontFamily: "monospace" }}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="body1">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {isCreator && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5">
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          onClick={() => handleLikePost(post._id)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {hasLiked ? (
            <ThumbUpIcon fontSize="small" color="primary" />
          ) : (
            <ThumbUpOutlinedIcon fontSize="small" color="primary" />
          )}
          <Typography variant="body1" sx={{ paddingLeft: "2px" }}>
            {post.likes.length}
          </Typography>
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

export default NewPost;
