import React, { useState } from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collectionReference, auth } from "../firebase";
import useStore from "../store";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const addTodo = useFirestoreCollectionMutation(collectionReference);
  const logStatus = useStore((state) => state.loggedIn);
  return (
    <div>
      <h1>Create a Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTitle("");
          setArticle("");
        }}
      >
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Add a post title"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="article">Post Description:</label>
        <textarea
          name="article"
          value={article}
          placeholder="Add the post text"
          required
          onChange={(e) => {
            setArticle(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            if (logStatus === true) {
              addTodo.mutate({
                title: title,
                article: article,
                userId: auth.currentUser.uid,
                author: auth.currentUser.displayName,
              });
            } else {
              alert("You need to be signed in to add a post!");
            }
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
