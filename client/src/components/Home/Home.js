import React, { useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
    const [currentId,setCurrentId] = useState(null);
  return (
    <div>
      <div className=" flex flex-col-reverse lg:flex-row">
        <div className=" w-full  lg:w-4/6">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className=" w-full lg:w-2/6 flex justify-center pt-3">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </div>
      </div>
    </div>
  );
};

export default Home;
