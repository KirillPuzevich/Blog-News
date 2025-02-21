import React, { FC, useEffect, useContext, useState } from "react";
import { MyContext } from "../../components/hooks/context";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../components/post";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/spinner";
import { Pagination } from "../../components/pagination";
import { ImgPreview } from "../../components/img-preview";
import { NoSearchResult } from "../../components/no-search-result";
import { SortDropdown } from "../../components/sort-post";
import {
  getPage,
  getImg,
  getOrder,
  getPosts,
  geSearchValue,
} from "../../store/selectors";
import {
  addMiddlewareAction,
  setPage,
  setSortedOrder,
} from "../../store/actions";
import "./styles.scss";
import { urlApi } from "../../serviceWorkerRegistration";

export const limit = 12;

interface BlogProps {
  apiUrl: string;
  createPostPath: string;
  categoryId: string;
}

export const Blog: FC<BlogProps> = ({ apiUrl, createPostPath, categoryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ctx = useContext(MyContext);

  const img = useSelector(getImg);
  const orderBy = useSelector(getOrder);
  const posts = useSelector(getPosts);
  const searchValue = useSelector(geSearchValue);
  const page = useSelector(getPage);

  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    //@ts-expect-error
    dispatch(addMiddlewareAction({ searchValue, order: orderBy, limit, page }, apiUrl));
  }, [searchValue, orderBy, page, dispatch]);

  const handleChangePage = (page: number) => {
    dispatch(setPage(page));
  };

  const handleOrder = (order: string) => {
    dispatch(setSortedOrder(order));
  };

  const goCreate = () => {
    navigate(createPostPath);
  };

  const addFavorites = async () => {
    const response = await fetch(`${urlApi}api/me/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Assuming you're using JWT
      },
      body: JSON.stringify({ categoryId }),
    });

    if (response.ok) {
      alert("Category added to favorites!");
    } else {
      alert("Failed to add category to favorites.");
    }
  };

  return (
    <section className={`blog ${ctx.isBlackTheme ? "blog__dark" : ""}`}>
      <div className="container">
        {posts.loading ? (
          <Spinner />
        ) : posts.content?.length === 0 ? (
          <NoSearchResult />
        ) : (
          <>
            {searchValue && <p className="blog__search">Search result: {searchValue}</p>}
            <div className="blog__top">
              <SortDropdown sortPosts={handleOrder} orderBy={orderBy} />
              <p className="blog__top-sorted">Sorted by: <strong>{orderBy}</strong></p>
              {role && ( 
                <div className="blog__top-container">
                  <button className="blog__top-container_btn" onClick={addFavorites}>
                    Add to favorites
                  </button>
                  {role === "ROLE_ADMIN" && (
                    <button className="blog__top-container_btn" onClick={goCreate}>
                      Create Post
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="blog__wrapper">
              {posts.content.map((item: any, index: number) => (
                <Post post={item} img={item} index={index} key={index} />
              ))}
            </div>
            <Pagination limit={limit} handleChangePage={handleChangePage} />
          </>
        )}
      </div>
      {img && <ImgPreview post={img} />}
    </section>
  );
}