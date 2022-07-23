import React from "react";
import { database } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import useStore from "../store";

function EditBlog() {
  const currentPostId = useStore((state) => state.currentPostId);
  const docRef = doc(database, "todos", currentPostId);
  const oldPostContent = useStore((state) => state.oldPostContent);
  const oldPostTitle = useStore((state) => state.oldPostTitle);
  const setPostTitle = useStore((state) => state.setPostTitle);
  const setPostContent = useStore((state) => state.setPostContent);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-7xl uppercase font-bold text-blue-500 m-[3rem]">
        Edit Post:
      </h1>
      <form
        className="flex flex-col bg-sky-700 p-5 w-[50rem] text-white text-3xl rounded-xl"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateDoc(docRef, {
            title: oldPostTitle,
            article: oldPostContent,
          }).then(() => {
            setPostTitle("");
            setPostContent("");
          });
        }}
      >
        <label htmlFor="title" className="uppercase font-bold mb-3">
          Edit Post Title:
        </label>
        <input
          name="title"
          value={oldPostTitle}
          className="text-blue-100 text-xl bg-sky-700 border"
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <label htmlFor="article" className="uppercase font-bold mb-3">
          Edit Post Content:
        </label>
        <textarea
          className="text-blue-100 text-xl bg-sky-700 border h-[30rem]"
          name="article"
          value={oldPostContent}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-white rounded-xl p-2 px-8 text-emerald-600 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 mt-3"
        >
          Submit Changes
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
