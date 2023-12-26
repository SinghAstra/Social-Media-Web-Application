import React, { useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import PaginationComp from "../Pagination/PaginationComp";
import Search from "../Search/Search";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <div>
      <div className=" flex flex-col-reverse lg:flex-row">
        <div className=" w-full  lg:9/12 ">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className=" w-full lg:w-3/12 flex justify-start items-center pt-1 flex-col">
          <Search />
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          <PaginationComp />
        </div>
      </div>
    </div>
  );
};

export default Home;
