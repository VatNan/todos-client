import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SubTodo from '../SubTodo'

// can't eject
configure({ adapter: new Adapter() })

describe('Component: SubTodo', () => {
  const props = {
    _id: '001x',
    text: 'eat food',
    isComplete: false,
    toggleTodo: () => {},
    deleteTodo: () => {}
  }
  const wrapper = shallow(<SubTodo {...props}/>)

  it('component can render', () => {
    expect(wrapper).toHaveLength(1)
  })
})
