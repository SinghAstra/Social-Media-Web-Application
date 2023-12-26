import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";

const PaginationComp = () => {
  return (
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
      page={1}
      count={10}
      color="primary"
      variant="outlined"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default PaginationComp;
