import React, { FC, useContext } from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import back from "./img/back.svg";
import next from "./img/next.svg";
import backWhite from "./img/backWhite.svg";
import nextWhite from "./img/nextWhite.svg";
import { MyContext } from "../hooks/context";
import { getPage, getCount } from "../../store/selectors/";

interface PaginationProps {
  limit: number;
  handleChangePage: (page: number) => void;
}

const getVisiblePages = (page: number, total: number): number[] => {
  if (total < 7) {
    return new Array(total).fill(null).map((_, i) => ++i);
  } else {
    if (page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total];
    } else if (page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    } else {
      return [1, 2, 3, 4, 5, total];
    }
  }
};

export const Pagination: FC<PaginationProps> = ({
  limit,
  handleChangePage,
}) => {
  const ctx = useContext(MyContext);
  const page = useSelector(getPage);
  const count = useSelector(getCount);
  const pageCount = Math.ceil(count / limit) || 1;
  const visiblePages = getVisiblePages(page, pageCount);

  const handlePrevPage = () => {
    if (page > 1) {
      handleChangePage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < pageCount) {
      handleChangePage(page + 1);
    }
  };

  return (
    <div className={`pagination ${ctx.isBlackTheme ? "pagination__dark" : ""}`}>
      <button
        type="button"
        className="pagination__arrow"
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        <img
          className="pagination__btn"
          src={ctx.isBlackTheme ? backWhite : back}
          alt="Previous"
        />
      </button>

      {visiblePages.map((pageNumber, index, array) => {
        return (
          <span key={pageNumber}>
            {array[index - 1] + 2 < pageNumber ? (
              <span className="pagination__dots">...</span>
            ) : null}
            <button
              type="button"
              className={`pagination__item ${
                page === pageNumber ? "pagination__item_active" : ""
              }`}
              onClick={() => handleChangePage(pageNumber)}
            >
              {pageNumber}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        className="pagination__arrow"
        onClick={handleNextPage}
        disabled={page === pageCount}
      >
        <img
          className="pagination__btn"
          src={ctx.isBlackTheme ? nextWhite : next}
          alt="Next"
        />
      </button>
    </div>
  );
};
