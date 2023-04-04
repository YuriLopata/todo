import React from "react";
import classNames from "classnames";
import axios from "axios";

import removeSvg from "../../assets/img/remove.svg";

import Badge from "../Badge/Badge";

import "./List.scss";

const List = ({
  items,
  isRemovable,
  onClick,
  onClickItem,
  onRemove,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm("Are you sure?")) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  if (items) {
    return (
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames(item.className, {
              active: activeItem && activeItem.id === item.id,
            })}
            onClick={onClickItem ? () => onClickItem(item) : null}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
            </span>
            {isRemovable && (
              <img
                className="list__remove-btn"
                src={removeSvg}
                alt="Remove icon"
                onClick={() => removeList(item)}
              />
            )}
          </li>
        ))}
      </ul>
    );
  }
};

export default List;
