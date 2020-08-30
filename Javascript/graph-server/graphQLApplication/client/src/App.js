import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';

import BookList from './components/book-list';
import AddBook from './components/add-book';

// apollo client setup
const client = new ApolloClient({
     uri: 'http://localhost:3200/gql'
});


function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
            <div className="main">
                <h1> My Collection of Books</h1>
                <AddBook />
                <BookList />

            </div>
        </ApolloProvider>

    </div>
  );
}

export default App;
