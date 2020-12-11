import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

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
      url: "http://localhost:5000/todos",
      data: {
        todo: this.state.item,
      },
    });
    this.setState({ item: "" });
    window.location = "/";
  };

  componentDidMount() {
    axios.get("http://localhost:5000/todos").then((todos) => {
      this.setState(() => ({
        todos: todos.data,
      }));
    });
  }

  onChangeTodoCompleted = (id, completed) => {
    axios.post("http://localhost:5000/todos/update/" + id, {
      completed: !completed,
    });
    this.setState((prevState) => {
      prevState.todos.map((todo) => {
        if (todo._id == id) todo.completed = !todo.completed;
      });
    });
  };

  render() {
    return (
      <div>
        <input type="text" onChange={this.changeHandler} />
        <button type="submit" onClick={this.clickHandler}>
          add
        </button>
        <div>
          <ul>
            {this.state.todos.length > 0 ? (
              this.state.todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  item={todo}
                  onChangeTodoCompleted={this.onChangeTodoCompleted}
                />
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
