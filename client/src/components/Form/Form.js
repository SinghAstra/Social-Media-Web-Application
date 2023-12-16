import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, fetchAllPost } from "../../actions/post";
import FileBase64 from "react-file-base64";

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    creator: "",
    tags: [],
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const clearFormData = () => {
    setFormData({
      title: "",
      message: "",
      creator: "",
      tags: [],
      selectedFile: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(formData));
    setFormData({
      "title":"",
      "message":"",
      "creator":"",
      "tags":[],
      "selectedFile":""
    })
    dispatch(fetchAllPost())
  };
  return (
    <div>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="creator"
            >
              Creator
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="creator"
              type="text"
              placeholder="Creator"
              value={formData.creator}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  creator: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              type="text"
              placeholder="Message"
              value={formData.message}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  message: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tags"
              type="text"
              placeholder="Tags"
              value={formData.tags.join(' ')}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  tags: e.target.value.split(' '),
                });
              }}
            />
          </div>
          <div className="mb-6">
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setFormData({
                  ...formData,
                  selectedFile: base64,
                });
              }}
            />
          </div>
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 mb-2 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SUBMIT
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 shadow-md w-full text-white font-medium  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={clearFormData}
            >
              CLEAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
