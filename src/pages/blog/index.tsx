import React, { FC, useEffect, useState, useContext } from "react";
import { MyContext } from "../../components/hooks/context";
import { useSelector } from "react-redux";
import { Post } from "../../components/post";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  REQUEST_POSTS_ACTION,
  addMiddlewareAction,
  setPage,
  setSortedOrder,
} from "../../store/actions";
import { Spinner } from "../../components/spinner";
import { Pagination } from "../../components/pagination";
import { ImgPreview } from "../../components/img-preview";
import { NoSearchResult } from "../../components/no-search-result";
import { SortDropdown } from "../../components/sort-post";
import {
  getPage,
  getImg,
  getOrder,
  getCount,
  getPosts,
  geSearchValue,
} from "../../store/selectors";

export const limit = 12;

export const BlogPage: FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const ctx = useContext(MyContext);

  const img = useSelector(getImg);

  const orderBy = useSelector(getOrder);

  const posts = useSelector(getPosts);

  const count = useSelector(getCount);

  const searchValue = useSelector(geSearchValue);

  const page = useSelector(getPage);

  const order = useSelector(getOrder);

  useEffect(() => {
    //@ts-expect-error
    dispatch(addMiddlewareAction({ searchValue, order, limit, page, count }));
  }, [searchValue, order, page]);

  const handleChangePage = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleOrder = (order: string) => {
    dispatch(setSortedOrder(order));
  };

  return (
    <section className={`blog ${ctx.isBlackTheme ? "blog__dark" : ""}`}>
      <div className="container">
        {!posts.loading && !posts.content.length ? (
          <NoSearchResult />
        ) : (
          <>
            {searchValue && (
              <p className="blog__search">Search result: {searchValue}</p>
            )}
            <div className="blog__sorted">
              {posts.content.length > 0 && (
                <>
                  <SortDropdown
                    sortPosts={(field) => {
                      handleOrder(field);
                    }}
                    orderBy={orderBy}
                  />
                  <p className="blog__sorted-field">
                    Sorted by: <strong>{orderBy}</strong>
                  </p>
                </>
              )}
            </div>
            <div
              className={`blog__wrapper ${
                !posts.content.length && !posts.loading ? "hidden" : ""
              }`}
            >
              {posts.content.map((item: any, index: number) => {
                return (
                  <Post post={item} img={item} index={index} key={index} />
                );
              })}
            </div>
            <Pagination limit={limit} handleChangePage={handleChangePage} />
            {posts.loading && <Spinner />}
          </>
        )}
      </div>
      {img && <ImgPreview post={img} />}
    </section>
  );
};
