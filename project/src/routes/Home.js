import "../App.css";
import { collectionReference } from "../firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { Link } from "react-router-dom";
import React from "react";

function Home() {
  const todosQuery = useFirestoreQuery(["todos"], collectionReference, {
    subscribe: true,
  });
  let content;

  const snapshot = todosQuery.data;
  if (snapshot !== null) {
    if (todosQuery.isLoading) {
      content = <p>Loading...</p>;
    } else if (todosQuery.isError) {
      content = <p>{todosQuery.error}</p>;
    } else {
      content = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return (
          <div key={docSnapshot.id}>
            <ul>
              <p>Title: {data.title}</p>
              <p>{data.article}</p>
              <p>{data.author}</p>
            </ul>
            <Link to={`/${docSnapshot.id}`}>
              <button>Go to page</button>
            </Link>
          </div>
        );
      });
    }
  }

  return (
    <div className="App">
      <h1>All Posts</h1>
      {content}
    </div>
  );
}

export default Home;
