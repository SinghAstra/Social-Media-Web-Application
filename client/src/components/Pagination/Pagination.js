import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPage }) => {
  const baseClasses = "flex items-center justify-center h-10 leading-tight ";
  const hoverClasses = "hover:bg-gray-700 hover:text-white hover:border-white";

  const sliderLink = (slider) => {
    return (
      <li
        className={`flex-1 ${baseClasses} ${hoverClasses} text-gray-700 bg-white`}
      >
        {slider}
      </li>
    );
  };

  const renderPageLink = (page, isCurrent) => {
    const classes = isCurrent
      ? `${baseClasses} bg-gray-700 text-white `
      : `${baseClasses} ${hoverClasses} text-gray-700 bg-white `;

    return (
      <li key={page} className="flex-1">
        <Link to={`/posts?page=${page}`} className={classes}>
          {isCurrent ? <span aria-current="page">{page}</span> : page}
        </Link>
      </li>
    );
  };

  return (
    <nav aria-label="Pagination">
      <ul className="flex text-base h-10 w-72 lg:w-64 mt-2 ">
        {sliderLink("<")}
        {[...Array(totalPage).keys()].map((page) =>
          renderPageLink(page + 1, currentPage === page + 1)
        )}
        {sliderLink(">")}
      </ul>
    </nav>
  );
};

export default Pagination;
