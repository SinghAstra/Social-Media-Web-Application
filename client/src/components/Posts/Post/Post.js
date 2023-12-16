import React from "react";
import moment from 'moment'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Post({ post }) {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2">
      <img
        className="w-full"
        src={post.selectedFile}
        alt="post"
      />
      <div className="px-6 py-4">
      <div className="text-xs ">{post.creator}</div>
      <div className="text-xs mb-1">{moment(post.createdAt).fromNow()}</div>
        <div className="font-bold text-lg mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">{post.message}</p>
      <div className="flex justify-between items-center p-1">
        <div className="flex flex-col justify-center items-start">
          <ThumbUpOutlinedIcon />
          <p>{post.likeCount}</p>
          </div>
        <DeleteIcon/>
      </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {post.tags.map(tag=>{
        return <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{tag}
        </span>
        })}
      </div>
    </div>
  );
}
