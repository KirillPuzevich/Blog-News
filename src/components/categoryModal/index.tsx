import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss"; // Подключаем стили

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="category-modal">
      <div className="category-modal__content">
        <span className="category-modal__close" onClick={onClose}>×</span>
        <ul className="category-modal__list">
          <li className="category-modal__item">
            <Link to="/sport-news" onClick={onClose}>Sport</Link>
          </li>
          <li className="category-modal__item">
            <Link to="/cultural-news" onClick={onClose}>Cultural</Link>
          </li>
          <li className="category-modal__item">
            <Link to="/entertainment-news" onClick={onClose}>Entertainment</Link>
          </li>
          <li className="category-modal__item">
            <Link to="/technology-news" onClick={onClose}>Technology</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
