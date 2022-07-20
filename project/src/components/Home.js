import "../App.css";
import { collectionReference, database } from "../firebase";
import {
  useFirestoreQuery,
  useFirestoreCollectionMutation,
} from "@react-query-firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";

function Home() {
  const addTodo = useFirestoreCollectionMutation(collectionReference);
  const todosQuery = useFirestoreQuery(["todos"], collectionReference, {
    subscribe: true,
  });
  let content;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [id, setId] = useState();

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
              <p>Description: {data.description}</p>
              <p>Document Id: {docSnapshot.id}</p>
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
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await deleteDoc(doc(database, "todos", id));
          setId("");
        }}
      >
        <h1>Delete a Todo</h1>
        <label htmlFor="id">Todo Id:</label>
        <input
          type="text"
          name="id"
          placeholder="Add a todo id"
          value={id}
          required
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button type="submit">Delete Todo</button>
      </form>
    </div>
  );
}

export default Home;
