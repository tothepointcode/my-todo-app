import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Clock from './components/clock';
import TodoInput from './components/todoInput';
import TodoList from './components/todoList';
import uuid from 'uuid';

// Firebase
import myTodosRef from './firebase';


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
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    let myTodos = [];

    myTodosRef.once("value", snapshot => {
      snapshot.forEach(data => {
        let myTodo = {
          id: data.val().id,
          task: data.val().task,
          key: data.key
        };
        myTodos.push(myTodo);
      });
      this.setState({
        todoList: myTodos,
        updateTask: ""
      });
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  handleNewTodo(newTodo) {
    newTodo = {
      id: uuid(),
      task: newTodo
    }
 
    // Firebase
    myTodosRef.push().set(newTodo).then(()=>{});

    this.fetchData();
  }

  handleDeleteTodo(todoItem) {
    // Firebase
    myTodosRef.child(todoItem.key).remove().then(()=> {});

    let oldTodoList = this.state.todoList;

    oldTodoList = oldTodoList.filter((item)=>{
      return item.id !== todoItem.id;
    });

    this.setState({
      todoList: oldTodoList
    });
  }

  handleUpdateTodo(item) {
    this.setState({
      updateId: item.id,
      updateKey: item.key,
      updateTask: item.task
    });
  }

  handleUpdateTodoSave(todo) {
    let oldTodoList = this.state.todoList;
    let updatedTodo = {
      id: this.state.updateId,
      key: this.state.updateKey,
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

    // Firebase
    myTodosRef.child(this.state.updateKey).update({id: this.state.updateId, task: todo}).then(()=>{});
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
