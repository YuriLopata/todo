import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "../List/List";
import Badge from "../Badge/Badge";

import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    setSelectedColor(colors[0].id);
  };

  const addFolder = () => {
    if (!inputValue) {
      alert("Enter the folder name");
      return;
    }

    setIsLoading(true)

    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = {...data, color: { name: color }}
        onAdd(listObj);
        onClose();
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "add-list__button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Add folder",
          },
        ]}
        isRemovable={false}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          ></img>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Folder name"
          ></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
                onClick={() => setSelectedColor(color.id)}
              />
            ))}
          </div>
          <button className="button" onClick={addFolder}>
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
