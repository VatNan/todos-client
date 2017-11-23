import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Todo } from './containers'
import registerServiceWorker from './registerServiceWorker'

const SERVER_URL = 'http://localhost:3001/graphql'

const client = new ApolloClient({
  link: new HttpLink({ uri: SERVER_URL }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Todo />
  </ApolloProvider>
  , document.getElementById('root'))
registerServiceWorker()
