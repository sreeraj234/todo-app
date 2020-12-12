import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import "./Todo.css";

export class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      item: "",
    };
  }

  changeHandler = (event) => {
    this.setState({ item: event.target.value });
  };

  clickHandler = (event) => {
    event.preventDefault();
    console.log(this.state.item);
    axios({
      method: "post",
      url: "http://backend:5000/todos",
      data: {
        todo: this.state.item,
      },
    });
    this.setState({ item: "" });
    window.location = "/";
  };

  componentDidMount() {
    axios.get("http://backend:5000/todos").then((todos) => {
      this.setState(() => ({
        todos: todos.data,
      }));
    });
  }

  onDelete = (id) => {
    axios
      .delete("http://backend:5000/todos/" + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo._id !== id),
    }));
  };

  onChangeTodoCompleted = (id, completed) => {
    this.setState((prevState) => {
      prevState.todos.map((todo) => {
        if (todo._id === id) todo.completed = !todo.completed;
        return todo;
      });
    });
    axios.post("http://backend:5000/todos/update/" + id, {
      completed: !completed,
    });
    window.location = "/";
  };

  render() {
    return (
      <div>
        <h1>TODO APP</h1>
        <div class="add-items d-flex">
          <input
            class="form-control todo-list-input"
            type="text"
            onChange={this.changeHandler}
          />
          <button
            class="add btn btn-primary font-weight-bold todo-list-add-btn"
            type="submit"
            onClick={this.clickHandler}
          >
            add
          </button>
        </div>
        <div>
          <ul class="list-group ">
            {this.state.todos.length > 0 ? (
              this.state.todos.map((todo) => (
                <li
                  class={
                    todo.completed === true
                      ? "list-group-item list-group-item-danger"
                      : "list-group-item list-group-item-success"
                  }
                >
                  <TodoItem
                    key={todo._id}
                    item={todo}
                    onChangeTodoCompleted={this.onChangeTodoCompleted}
                    onDelete={this.onDelete}
                  />
                </li>
              ))
            ) : (
              <p>Enter A todo</p>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Todo;
