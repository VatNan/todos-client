import React from 'react'
import PropsTypes from 'prop-types'
import { Button } from 'reactstrap'
import './styles.css'

SubTodo.PropTypes = {
  _id: PropsTypes.string.isRequired,
  text: PropsTypes.string.isRequired,
  isBoolean: PropsTypes.bool.isRequired,
  toggleTodo: PropsTypes.func.isRequired,
  deleteTodo: PropsTypes.func.isRequired,
}

function SubTodo(props) {
  const { isComplete } = props
  return(
    <div>
      <div className='card-todo'>
        {isComplete
          ? <del><h3>{props.text}</h3></del>
          : <h3>{props.text}</h3>}
      </div>
      <div className='card-btn'>
        <Button
          onClick={() => props.toggleTodo()}
          color={isComplete ? 'warning' : 'success'}
        >
          {isComplete ? 'Not-Complete' : 'Complete'}
        </Button> {'  '}
        <Button
          onClick={() => props.deleteTodo()}
          color='danger'
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default SubTodo
