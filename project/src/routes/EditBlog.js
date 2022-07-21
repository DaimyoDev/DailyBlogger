import React, { useState } from "react";
import { database } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import useStore from "../store";

function EditBlog() {
  const currentPostId = useStore((state) => state.currentPostId);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedArticle, setEditedArticle] = useState("");
  const docRef = doc(database, "todos", currentPostId);
  const oldPostContent = useStore((state) => state.oldPostContent);
  const oldPostTitle = useStore((state) => state.oldPostTitle);
  const setPostTitle = useStore((state) => state.setPostTitle);
  const setPostContent = useStore((state) => state.setPostContent);

  return (
    <div>
      <h1>Edit Post</h1>
      <form
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
        <label htmlFor="title">Edit Post Title</label>
        <input
          name="title"
          value={oldPostTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <label htmlFor="article">Edit Post Content</label>
        <input
          name="article"
          value={oldPostContent}
          onChange={(e) => {
            setPostContent(e.target.value);
          }}
        />
        <button type="submit">Submit Changes</button>
      </form>
    </div>
  );
}

export default EditBlog;
