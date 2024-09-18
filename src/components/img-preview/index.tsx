import React, { FC } from "react";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { REMOVE_IMG_ACTION } from "../../store/actions";

interface ImgPreviewProps {
  post: {
    image_url: string;
  };
}

export const ImgPreview: FC<ImgPreviewProps> = ({ post }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(REMOVE_IMG_ACTION);
  };

  return (
    <div className="modal__photo">
      <div className="modal__photo-wrapper">
        <button className="modal__photo-button" onClick={handleCancel}>
          x
        </button>
        <img
          className="modal__photo-img"
          src={post.image_url}
          alt=""
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/600x400";
          }}
        />
      </div>
    </div>
  );
};
