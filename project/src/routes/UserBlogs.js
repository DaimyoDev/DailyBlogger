import React from "react";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collectionReference, database } from "../firebase";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import useStore from "../store";

function UserBlogs() {
  const todosQuery = useFirestoreQuery(["todos"], collectionReference, {
    subscribe: true,
  });
  const setCurrentPostId = useStore((state) => state.setCurrentPostId);
  const setPostTitle = useStore((state) => state.setPostTitle);
  const setPostContent = useStore((state) => state.setPostContent);
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
        if (data.userId === auth.currentUser.uid) {
          return (
            <div key={docSnapshot.id}>
              <ul>
                <Link to={`/${docSnapshot.id}`}>
                  <p>Title: {data.title}</p>
                  <p>Description: {data.article}</p>
                  <button
                    onClick={async () => {
                      await deleteDoc(doc(database, "todos", docSnapshot.id));
                    }}
                  >
                    Delete Post
                  </button>
                </Link>
                <Link
                  to={`/${docSnapshot.id}/edit`}
                  onClick={() => {
                    setCurrentPostId(docSnapshot.id);
                    setPostContent(data.article);
                    setPostTitle(data.title);
                  }}
                >
                  Edit Post
                </Link>
              </ul>
            </div>
          );
        }
      });
    }
  }

  return (
    <div>
      <h1>Your Posts</h1>
      {content}
    </div>
  );
}

export default UserBlogs;
