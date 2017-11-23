import React from 'react'
import ReactDOM from 'react-dom'
import gql from 'graphql-tag'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const SERVER_URL = 'http://localhost:3001/graphql'

const client = new ApolloClient({
  link: new HttpLink({ uri: SERVER_URL }),
  cache: new InMemoryCache()
})

client.query({ query: gql`{ todos { _id isComplete text } }` }).then(console.log);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'))
registerServiceWorker()
