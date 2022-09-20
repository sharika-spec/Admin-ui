import React from "react";

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={() => paginate(1)} href="!#" className="page-link">
            {"<<"}
          </a>
        </li>

        {totalPosts === 1 || currentPage === 1 ? (
          <li className="page-item disabled">
            <a href="!#" className="page-link">
              {"<"}
            </a>
          </li>
        ) : (
          <li className="page-item">
            <a
              onClick={() => paginate(currentPage - 1)}
              href="!#"
              className="page-link"
            >
              {"<"}
            </a>
          </li>
        )}

        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}

        {currentPage === Math.ceil(totalPosts / postsPerPage) ? (
          <li className="page-item disabled">
            <a href="!#" className="page-link">
              {">"}
            </a>
          </li>
        ) : (
          <li className="page-item">
            <a
              onClick={() => paginate(currentPage + 1)}
              href="!#"
              className="page-link"
            >
              {">"}
            </a>
          </li>
        )}

        <li className="page-item">
          <a
            onClick={() => paginate(Math.ceil(totalPosts / postsPerPage))}
            href="!#"
            className="page-link"
          >
            {">>"}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
