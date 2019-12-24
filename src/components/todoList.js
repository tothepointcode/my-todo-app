import React from 'react';

export default class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(item) {
        this.props.handleDeleteTodo(item);
    }

    handleUpdate(item) {
        this.props.handleUpdateTodo(item);
    }

    render(){
        let todos = this.props.todoList;

        const todoList = todos.length ? (
            todos.map((item)=>{
            return <li key={item.id}><span>--</span> <span onClick={this.handleUpdate.bind(this, item)}>{item.task}</span> <span onClick={this.handleDelete.bind(this, item)}>X</span> </li>
        }) ) : ( 
            <p>Loading ... </p> 
        );
        
        return(
            <div className="todoList">
                {todoList}
            </div>
        );
    }
}