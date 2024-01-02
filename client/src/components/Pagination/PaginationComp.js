import React from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { useSelector } from "react-redux";

const PaginationComp = ({ page }) => {
  const numberOfPages = useSelector((state) => state.posts.numberOfPages);
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
      page={Number(page)}
      count={numberOfPages}
      color="primary"
      variant="outlined"
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default PaginationComp;
