import gql from 'graphql-tag'
// import 'graphql-tag'
import { graphql } from 'react-apollo'
import { rawQuery } from './query'

const addTodo = graphql(gql`
  mutation AddTodo($todo: TodoInput!) {
    addTodo(todo: $todo) {
      _id
      text
      isComplete
    }
  }`, 
  {
    name: 'mutateAddTodo',
    props: ({ mutateAddTodo }) => ({
      addTodo: (todo) => mutateAddTodo({ variables: { todo } })
    }),
    options: {
      update: (proxy, { data: { addTodo } }) => {
        const data = proxy.readQuery({ query: rawQuery })  
        console.log('============================')
        console.log('deleteTodo', addTodo)
        console.log('data.todos', data.todos)     
        data.todos.push(addTodo)
        console.log('data.todos new', data.todos)  
        proxy.writeQuery({ query: rawQuery, data })    
      }
    }
  }
)

const toggleTodo = graphql(gql`
  mutation ToggleTodo($todoId: String!) {
    toggleTodo(todoId: $todoId) {
      _id
      text
      isComplete
    }
  }`, 
  {
    name: 'mutateToggleTodo',
    props: ({ mutateToggleTodo }) => ({
      toggleTodo: (todoId) => mutateToggleTodo({ variables: { todoId } })
    }),
    options: {
      update: (proxy, { data: { toggleTodo } }) => {
        const data = proxy.readQuery({ query: rawQuery })
        const newData = data.todos.map((todo) => {
          if (todo._id === toggleTodo._id) {
            return { ...todo, isComplete: toggleTodo.isComplete}
          } else {
            return toggleTodo
          }
        })
        proxy.writeQuery({
          query: rawQuery,
          data: newData
        })
      }
    }
  }
)

const deleteTodo = graphql(gql`
  mutation DeleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId) {
      _id
      text
      isComplete
    }
  }`, 
  {
    name: 'mutateDeleteTodo',
    props: ({ mutateDeleteTodo }) => ({
      deleteTodo: (todoId) => mutateDeleteTodo({ variables: { todoId } })
    })
  }
)

export {
  addTodo,
  toggleTodo,
  deleteTodo
}
