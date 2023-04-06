import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { AddTaskForm } from "./AddTaskForm";
import { Task } from "./Task";

import editSvg from "../../assets/img/edit.svg";

import "./Tasks.scss";

const Tasks = ({
  list,
  onAddTask,
  onEditTitle,
  onRemoveTask,
  withoutEmpty,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Folder name", list.name);
    if (newTitle) {
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .then(() => {
          onEditTitle(list.id, newTitle);
        })
        .catch(() => {
          alert("Failad to rename folder");
        });
    }
  };

  return (
    <div className="tasks">
      <NavLink to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="Edit icon" />
        </h2>
      </NavLink>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>There are no tasks</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
