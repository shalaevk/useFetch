import { useState, createContext } from "react";
import { useFetch } from "./hooks";
import { Array } from "./Array";
import { LocalStorage } from "../localStorage";
import { Child } from "./Child";

const URLS = {
  USERS: "https://jsonplaceholder.typicode.com/users",
  POSTS: "https://jsonplaceholder.typicode.com/posts",
  COMMENTS: "https://jsonplaceholder.typicode.com/comments",
};

// // BONUS:
// const OPTIONS = {
//   method: "POST",
//   body: JSON.stringify({ name: "Kyle" }),
//   headers: {
//     "Content-type": "application/json",
//   },
// };

export const UrlContext = createContext("");

function App() {
  const [url, setUrl] = useState(URLS.USERS);
  const { state } = useFetch(url);

  return (
    <>
      <UrlContext.Provider value={url}>
        <Child />
        <div>
          <label>
            <input
              type="radio"
              checked={url === URLS.USERS}
              onChange={() => setUrl(URLS.USERS)}
            />
            Users
          </label>
          <label>
            <input
              type="radio"
              checked={url === URLS.POSTS}
              onChange={() => setUrl(URLS.POSTS)}
            />
            Posts
          </label>
          <label>
            <input
              type="radio"
              checked={url === URLS.COMMENTS}
              onChange={() => setUrl(URLS.COMMENTS)}
            />
            Comments
          </label>
        </div>
        {state.isLoading ? (
          <h1>Loading...</h1>
        ) : state.isError ? (
          <h1>Error</h1>
        ) : (
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        )}
        {/* <Array /> */}
        {/* <LocalStorage /> */}
      </UrlContext.Provider>
    </>
  );
}

export default App;
