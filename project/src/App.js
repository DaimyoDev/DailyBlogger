import "./App.css";
import { collectionReference } from "./firebase";
import {
  useFirestoreQuery,
  useFirestoreCollectionMutation,
} from "@react-query-firebase/firestore";
import { useState } from "react";

function App() {
  const addTodo = useFirestoreCollectionMutation(collectionReference);
  const todosQuery = useFirestoreQuery(["todos"], collectionReference, {
    subscribe: true,
  });
  let content;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const snapshot = todosQuery.data;

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
            <li>{data.title}</li>
            <li>{data.description}</li>
          </ul>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <h1>Hi!</h1>
      {content}
      <h1>Add a Todo</h1>
      <form>
        <label htmlFor="title">Todo Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Add a todo title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="description">Todo Description:</label>
        <textarea
          name="description"
          placeholder="Add a todo description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
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

export default App;
