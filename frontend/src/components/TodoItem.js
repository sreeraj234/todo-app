import React from "react";

function TodoItem(props) {
  const lstyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div className="todo-item " style={lstyle}>
      <input
        class="todo-checkbox"
        type="checkbox"
        checked={props.item.completed}
        onChange={() =>
          props.onChangeTodoCompleted(props.item._id, props.item.completed)
        }
      />
      <label>{props.item.todo}</label>
      <button
        class="btn btn-danger btn-sm"
        onClick={() => props.onDelete(props.item._id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
