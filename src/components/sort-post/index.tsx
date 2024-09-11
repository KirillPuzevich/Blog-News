import React, { FC, useState } from "react";
import "./styles.scss";

interface SortDropdownProps {
  sortPosts: (field: string) => void;
  orderBy: string;
}

export const SortDropdown: FC<SortDropdownProps> = ({ sortPosts, orderBy }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fields = ["published_at", "id"];

  const handleSort = (field: string) => {
    sortPosts(field);
    setIsOpen(false);
  };

  return (
    <div className="sort">
      <button className="sort__btn" onClick={() => setIsOpen(!isOpen)}>
        Select sort
      </button>
      {isOpen && (
        <div className="sort__content">
          {fields.map((field) => (
            <button
              className={`sort__content-item ${orderBy === field ? "sort__content-item_active" : ""
                }`}
              key={field}
              onClick={() => handleSort(field)}
            >
              {field}
            </button>
          ))}
          <button
            className="sort__content-close"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
