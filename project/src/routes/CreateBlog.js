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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-7xl uppercase font-bold text-blue-500 m-[3rem] text-center">
        Create a Post:
      </h1>
      <form
        className="flex flex-col bg-sky-700 p-5 tablet:w-[50rem] text-white text-3xl rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          setTitle("");
          setArticle("");
        }}
      >
        <label htmlFor="title" className="uppercase font-bold mb-3">
          Post Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Add a post title"
          className="text-blue-100 text-xl bg-sky-700 border"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="article" className="uppercase font-bold mb-3">
          Post Description:
        </label>
        <textarea
          name="article"
          value={article}
          placeholder="Add the post text"
          required
          className="text-blue-100 text-xl bg-sky-700 border h-[30rem]"
          onChange={(e) => {
            setArticle(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-white rounded-xl p-2 px-8 text-emerald-600 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 mt-3"
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
