import React from 'react';

export default class TodoInput extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let todo = this.refs.todoItem.value.trim();
        if (todo === "") {
            alert("Please enter a todo!");

        } else if (!this.props.updateId) {
            this.props.handleNewTodo(todo);
            
        } else {
            this.props.handleUpdateTodoSave(todo);
        }
    }

    handleChange(e) {
        this.props.handleInputChange(e.target.value);
    }

    render(){
        return(
            <div className="todoInput">
                <form onSubmit={this.handleSubmit}>
                    <input ref="todoItem" type="text" onChange={this.handleChange} placeholder="Enter a todo" value={this.props.updateTask}/>
                </form>
            </div>
        );
    }
}