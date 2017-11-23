import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { TodoContainer } from '../TodoContainer'

// can't eject
configure({ adapter: new Adapter() })

describe('Component: TodoContainer', () => {
  const props = {
    data: {
      loading: false,
      error: false,
      todos: [
        { _id: '001x', text: 'eat food', isComplete: false },
        { _id: '002x', text: 'eat foot', isComplete: true },
      ],
      refetch: () => {}
    },
    addTodo: jest.fn(),
    deleteTodo: jest.fn(),
    toggleTodo: jest.fn()
  }
  const wrapper = shallow(<TodoContainer {...props} />)

  beforeEach(() => {
    props.addTodo.mockClear()
    props.deleteTodo.mockClear()
    props.toggleTodo.mockClear()
  })
  it('component can render', () => {
    expect(wrapper).toHaveLength(1)
  })

  it('when add todo input not full then can not call api', () => {
    const inst = wrapper.instance()
    inst.textInput = {}
    inst.textInput = {
      value: '',
      focus: () => {}
    }
    inst.addTodo()
    expect(inst.props.addTodo).not.toHaveBeenCalled()
  })

  it('when add todo input not full then can not call mutation', () => {
    const inst = wrapper.instance()
    inst.textInput = {}
    inst.textInput = {
      value: 'test eat',
      focus: () => {}
    }
    inst.addTodo()
    expect(inst.props.addTodo).toHaveBeenCalled()
  })

  it('when toggle todo must call mutation', () => {
    const inst = wrapper.instance()
    inst.toggleTodo(props.data.todos[0]._id)
    expect(inst.props.toggleTodo).toHaveBeenCalled()
  })

  it('when delete todo must call mutation', () => {
    const inst = wrapper.instance()
    inst.deleteTodoAndRefetch(props.data.todos[0]._id)
    expect(inst.props.deleteTodo).toHaveBeenCalled()
  })
})
