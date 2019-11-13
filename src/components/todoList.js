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
        todos = todos.map((item)=>{
            return <li key={item.id}><span>--</span> <span onClick={this.handleUpdate.bind(this, item)}>{item.task}</span> <span onClick={this.handleDelete.bind(this, item)}>X</span> </li>
        });
        return(
            <div className="todoList">
                {todos}
            </div>
        );
    }
}