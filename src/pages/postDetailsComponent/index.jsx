import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../../components/spinner/";
import { MyContext } from "../../components/hooks/context";
import twitter from "./img/twitter.svg";
import facebook from "./img/facebook.svg";
import dots from "./img/dots.svg";
import { ModalDelete } from "../../components/modalDelete";
import "./styles.scss"; // Убедитесь, что путь правильный

const PostDetailsComponent = ({ post, onDelete, isLoading, nav }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const ctx = useContext(MyContext);

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert("Ссылка скопирована в буфер обмена!");
            })
            .catch(err => {
                console.error("Ошибка при копировании: ", err);
            });
    } else {
        alert("Clipboard API не поддерживается в этом браузере.");
    }
};

  const handleDeleteConfirm = () => {
    onDelete();
    setModalOpen(false);
  };

  if (isLoading || !post || post.length === 0) {
    return <Spinner />;
  }

  return (
    <div className={`details ${ctx.isBlackTheme ? "details__dark" : ""}`}>
      <div className="container">
        <div className="details__container">
          <Link to={nav} className="details__container-btn">
            Back
          </Link>
          <p className="details__container-post"> / Post {post.id}</p>
          {role === "ROLE_ADMIN" && (
            <button className="details__container-delete" onClick={() => setModalOpen(true)}>
              Delete Post
            </button>
          )}
        </div>
        <h1 className="details__title">{post.title}</h1>
        <div className="details__content">
          <img
            className="details__content-img"
            src={post.imageUrl}
            alt=""
            onError={(e) => (e.target.src = "https://placehold.co/600x400")}
          />
          <p className="details__content-text">{post.summary}</p>
          <div className="details__actions">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="Share on Facebook"
                className="details__icon"
              />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitter}
                alt="Share on Twitter"
                className="details__icon"
              />
            </a>
            <img
              src={dots}
              className="details__icon"
              onClick={handleCopyLink}
              alt="Copy link"
            />
          </div>
        </div>
      </div>

      <ModalDelete
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default PostDetailsComponent;