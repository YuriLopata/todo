import React, { useState } from "react";
import axios from "axios";

import addSvg from "../../assets/img/add.svg";

export const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };

    setIsSending(true);

    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        console.log(data);
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert('Failad to add task')
      })
      .finally(() => {
        setIsSending(false);
      })
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>New task</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="field"
            type="text"
            placeholder="Task text"
          />
          <button onClick={addTask} className="button">
            {isSending ? 'Adding..' : 'Add task'}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
