import React from "react";
import "./styles.scss";

export const ModalDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
        <div className="modal__delete">
          <div className="modal__delete-container">
            <h2 className="modal__delete-title">
              Вы действительно хотите удалить новость?
            </h2>
            <button className="modal__delete-confirm" onClick={onConfirm}>
              Удалить
            </button>
            <button className="modal__delete-close" onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
  );
};
