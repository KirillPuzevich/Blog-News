import React, { FC } from "react";
import "./styles.scss";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalLogin: FC<ModalLoginProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal__login">
      <div className="modal__login-container">
        <h2 className="modal__login-title">
          Поздравляем, вы успешно авторизовались!
        </h2>
        <button className="modal__login-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
