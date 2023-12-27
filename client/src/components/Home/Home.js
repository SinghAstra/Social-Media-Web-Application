import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import PaginationComp from "../Pagination/PaginationComp";
import Search from "../Search/Search";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAllPost, fetchPostBySearch } from "../../actions/post";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/posts/search") {
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";
      const tags = searchParams.get("tags") || "";
      dispatch(fetchPostBySearch({ search, tags }));
    } else {
      dispatch(fetchAllPost());
    }
  }, [dispatch, location]);

  return (
    <div>
      <div className=" flex flex-col-reverse lg:flex-row">
        <div className=" w-full  lg:9/12 ">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className=" w-full lg:w-3/12 flex justify-start items-center pt-1 flex-col">
          <Search initialSearch={location.search} />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          <PaginationComp />
        </div>
      </div>
    </div>
  );
};

export default Home;
