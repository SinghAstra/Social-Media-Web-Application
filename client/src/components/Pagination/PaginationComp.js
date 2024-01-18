import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { PaginationItem } from "@mui/material";
import { useSelector } from "react-redux";

const PaginationComp = ({ page }) => {
  const [url, setUrl] = useState(`/posts?`);
  const numberOfPages = useSelector((state) => state.posts.numberOfPages);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/posts/search") {
      const searchParams = new URLSearchParams(location.search);
      const initialTitleValue = searchParams.get("search");
      const initialTagsValue = searchParams.get("tags");
      const title = initialTitleValue !== null ? initialTitleValue : "";
      const tags =
        initialTagsValue !== null && initialTagsValue !== ""
          ? initialTagsValue.split(",")
          : [];
      setUrl(
        `/posts/search?search=${title || ""}&tags=${
          tags.length > 0 ? tags.join(",") : ""
        }&`
      );
    } else {
      setUrl("/posts?");
    }
  }, [location, page]);
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
          to={`${url}page=${item.page}`}
        />
      )}
    />
  );
};

export default PaginationComp;
