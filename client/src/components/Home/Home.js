import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [page, setPage] = useState();

  useEffect(() => {
    console.log("page is ", page);
  }, [page]);

  const handlePagination = (event) => {
    setPage(event.target.textContent);
  };
  return (
    <div>
      <div className=" flex flex-col-reverse lg:flex-row">
        <div className=" w-full  lg:9/12 ">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className=" w-full lg:w-3/12 flex justify-start items-center pt-3 flex-col">
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          <Pagination
            sx={{
              color: "black",
              fontWeight: "bold",
              backgroundColor: "white",
              boxShadow: 1,
              borderRadius: 2,
              mt: 2,
              px: 0.5,
              py: 1,
            }}
            size="small"
            count={10}
            color="primary"
            variant="outlined"
            shape="rounded"
            onChange={handlePagination}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
