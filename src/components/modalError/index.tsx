import React, { FC } from "react";
import "./styles.scss";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalError: FC<ModalErrorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__error">
      <div className="modal__error-container">
        <h2 className="modal__error-title">Ошибка</h2>
        <p className="modal__error-text">Неверный логин или пароль</p>
        <button className="modal__error-close" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
