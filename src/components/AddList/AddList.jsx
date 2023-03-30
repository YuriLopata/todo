import React, { useState } from "react";
import List from "../List/List";

import "./AddList.scss";

const AddList = () => {
  const [visiblePopup, setvisiblePopup] = useState(true);

  return (
    <div className="add-list">
      <List
        onClick={() => setvisiblePopup(true)}
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
          <input className="field" type="text" placeholder="Folder name"></input>
          <button className="button">Add</button>
        </div>
      )}
    </div>
  );
};

export default AddList;
