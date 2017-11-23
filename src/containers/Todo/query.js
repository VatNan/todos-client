import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
const rawQuery = gql`
  query TodoList {
    todos {
      _id
      text
      isComplete
    }
  }
`

export default graphql(rawQuery)
export {
  rawQuery
}