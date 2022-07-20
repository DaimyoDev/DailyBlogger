import "../App.css";
import { collectionReference } from "../firebase";
import {
  useFirestoreQuery,
  useFirestoreCollectionMutation,
} from "@react-query-firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const addTodo = useFirestoreCollectionMutation(collectionReference);
  const todosQuery = useFirestoreQuery(["todos"], collectionReference, {
    subscribe: true,
  });
  let content;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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
            {console.log(data)}
            <Link to={`/${docSnapshot.id}`}>
              <ul>
                <p>{data.title}</p>
                <li>{data.description}</li>
              </ul>
            </Link>
          </div>
        );
      });
    }
  }

  return (
    <div className="App">
      {content}
      <h1>Add a Todo</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTitle("");
          setDescription("");
        }}
      >
        <label htmlFor="title">Todo Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Add a todo title"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="description">Todo Description:</label>
        <textarea
          name="description"
          value={description}
          placeholder="Add a todo description"
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            addTodo.mutate({
              title: title,
              description: description,
            });
          }}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default Home;
