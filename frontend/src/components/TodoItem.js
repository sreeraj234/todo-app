import React from "react";

function TodoItem(props) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={props.item.completed}
        onChange={() =>
          props.onChangeTodoCompleted(props.item._id, props.item.completed)
        }
      />
      <label>{props.item.todo}</label>
    </div>
  );
}

export default TodoItem;
