import { useState } from "react";
import { useFetch } from "./hooks";
import { Array } from "./Array";

const URLS = {
  USERS: "https://jsonplaceholder.typicode.com/users",
  POSTS: "https://jsonplaceholder.typicode.com/posts2",
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

function App() {
  const [url, setUrl] = useState(URLS.USERS);

  const { data, isLoading, isError } = useFetch(url);

  console.log("Data:", data, "Error:", isError, "iSLoading:", isLoading);

  return (
    <>
      {/* <div>
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
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )} */}
      <Array />
    </>
  );
}

export default App;
