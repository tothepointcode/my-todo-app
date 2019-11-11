import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Clock from './components/clock';
import TodoInput from './components/todoInput';
import TodoList from './components/todoList';
import uuid from 'uuid';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      updateId: 0,
      updateTask: "",
      todoList: []
    }
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpdateTodoSave = this.handleUpdateTodoSave.bind(this);
  }

  componentWillMount() {
    this.setState({
      todoList: [
        {
          id: uuid(),
          task: "Buy food stuff"
        },
        {
          id: uuid(),
          task: "Finish react project"
        },
        {
          id: uuid(),
          task: "Fix faulty television"
        }
      ]
    })
  }

  handleNewTodo(newTodo) {
    let oldTodoList = this.state.todoList;

    // let newId = oldTodoList[oldTodoList.length-1].id + 1

    newTodo = {
      id: uuid(),
      task: newTodo
    }
    oldTodoList.push(newTodo);

    this.setState({
      todoList: oldTodoList,
      updateTask: ""
    });
    console.log(this.state.todoList);
  }

  handleDeleteTodo(todoId) {
    let oldTodoList = this.state.todoList;

    oldTodoList = oldTodoList.filter((item)=>{
      return item.id !== todoId;
    });

    this.setState({
      todoList: oldTodoList
    });
  }

  handleUpdateTodo(item) {
    this.setState({
      updateId: item.id,
      updateTask: item.task
    });
  }

  handleUpdateTodoSave(todo) {
    let oldTodoList = this.state.todoList;
    let updatedTodo = {
      id: this.state.updateId,
      task: todo
    }

    oldTodoList = oldTodoList.filter((item)=>{
      return item.id !== this.state.updateId;
    });

    oldTodoList.push(updatedTodo);

    this.setState({
      todoList: oldTodoList,
      updateId: 0,
      updateTask: ""
    });
  }

  handleInputChange(value) {
    this.setState({
      updateTask: value
    });
  }

  render() {
    return(
      <main className="App">
        <Header />
        <Clock />
        <TodoInput handleUpdateTodoSave={this.handleUpdateTodoSave} handleInputChange={this.handleInputChange} updateTask={this.state.updateTask} updateId={this.state.updateId} handleNewTodo={this.handleNewTodo} />
        <TodoList handleUpdateTodo={this.handleUpdateTodo} handleDeleteTodo={this.handleDeleteTodo} todoList={this.state.todoList} />
        <Footer />
      </main>
    );
  }
}
