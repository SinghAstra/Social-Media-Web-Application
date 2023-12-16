import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createPost, fetchAllPost } from '../../actions/post';
import FileBase64 from 'react-file-base64';

export default function Form() {
  const [title,setTitle] = useState();
  const [message,setMessage] = useState();
  const [creator,setCreator] = useState();
  const [tag,setTag] = useState();
  const [selectedFile,setSelectedFile] = useState();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const tags = [tag];
    dispatch(createPost({title,message,creator,tags,selectedFile}));
    setTitle("");
    setMessage("");
    setCreator("");
    setTag("");
    dispatch(fetchAllPost())
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <input type='text' placeholder='title' value={title} onChange={e=>setTitle(e.target.value)} required/>
      <input type='text' placeholder='message' value={message} onChange={e=>setMessage(e.target.value)} required/>
      <input type='text' placeholder='creator' value={creator} onChange={e=>setCreator(e.target.value)} required/>
      <input type='text' placeholder='tag' value={tag} onChange={e=>setTag(e.target.value)} required/>
      <FileBase64
      type="file"
      ref={fileInputRef}
        multiple={ false }
        onDone={ ({ base64 }) => setSelectedFile(base64) } />
      <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
