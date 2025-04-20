import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useSubscription } from "@apollo/client";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import PropTypes from 'prop-types';
import { updateCache } from "./utils/updateCache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {   
      const addedBook = data.data.bookAdded
      window.alert(`New book added: ${addedBook.title}`)
      updateCache(client.cache, { query: ALL_BOOKS}, addedBook)
    },
    onError: (error) => {
      console.error(error)
    }
  })



  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <Login setToken={setToken} setError={notify} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;


const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

Notify.propTypes = {
  errorMessage: PropTypes.string
};
