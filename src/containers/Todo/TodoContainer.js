import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { InputGroup, InputGroupButton, Button } from 'reactstrap'
import { compose } from 'react-apollo'
import SubTodo from './SubTodo'
import query from './query'
import { addTodo, deleteTodo, toggleTodo } from './mutations'
import './styles.css'

class TodoContainer extends Component {
  static PropTypes = {
    data: PropsTypes.array.isRequired,
    addTodo: PropsTypes.func.isRequired,
    toggleTodo: PropsTypes.func.isRequired,
    deleteTodo: PropsTypes.func.isRequired
  }

  addTodo = async () => {
    const { value: text } = this.textInput
    if (!text.trim()) {
      alert('todo must have description')
      this.textInput.focus()
      return
    }

    try {
      await this.props.addTodo({
        text: this.textInput.value
      })
      this.textInput.value = '' 
    } catch (error) {
      console.error('addTodo function', error)
    }
  }

  deleteTodoAndRefetch = async (todoId) => {
    try {
      await this.props.deleteTodo(todoId)
      this.props.data.refetch() 
    } catch (error) {
      console.error('deleteTodoAndRefetch function', error)      
    }
  }

  toggleTodo = async (todoId) => {
    try {
      await this.props.toggleTodo(todoId) 
    } catch (error) {
      console.error('toggleTodo function', error)
    }
  }

  renderFromAddTodo = () => {
    return (
      <div className='col-sm-8 offset-sm-2 block-add-todo'>
        <InputGroup>
          <input
            className='input-add-todo'
            ref={(component) => { this.textInput = component }}
          />
          <InputGroupButton>
            <Button onClick={this.addTodo} color="primary">Add</Button>
          </InputGroupButton>
        </InputGroup>
      </div>
    )
  }

  renderTodoList = () => {
    const { todos, loading, error } = this.props.data
    if (loading) {
      return
    }

    if (error) {
      alert('Have problem when fecth data TT')
      return
    }

    return (
      <div className='col-sm-8 offset-sm-2 block-todo-list'>
        {todos.map((todo) => (
          <SubTodo
            key={todo._id}
            {...todo}
            toggleTodo={() => this.props.toggleTodo(todo._id)}
            deleteTodo={() => this.deleteTodoAndRefetch(todo._id)}
          />
          )
        )}
      </div>
    )
  }

  render() {
    return (
      <div className='root'>
        <h1 className='text-center'>
          Todo Naja!
        </h1>
        {this.renderFromAddTodo()}
        {this.renderTodoList()}
      </div>
    )
  }
}

export default compose(
  query,
  addTodo,
  deleteTodo,
  toggleTodo
)(TodoContainer)
export {
  TodoContainer
}
