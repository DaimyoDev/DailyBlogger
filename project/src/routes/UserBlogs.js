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
  const logStatus = useStore((state) => state.loggedIn);

  let content;
  const snapshot = todosQuery.data;
  if (snapshot !== null) {
    if (todosQuery.isLoading) {
      content = <p>Loading...</p>;
    } else if (todosQuery.isError) {
      content = <p>{todosQuery.error}</p>;
    } else {
      if (snapshot.docs === null) {
        return;
      }
      content = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        if (data.userId === auth.currentUser.uid) {
          return (
            <div
              key={docSnapshot.id}
              className="w-[70rem] bg-sky-700 rounded-lg mt-5 p-5 shadow-lg shadow-zinc-700 text-center"
            >
              <ul className="flex flex-col justify-center items-center">
                <Link to={`/${docSnapshot.id}`}>
                  <p className="text-4xl text-emerald-300 m-3 uppercase font-bold">
                    Title: {data.title}
                  </p>
                  <p className="text-2xl text-white m-3 text-center">
                    Description: {data.article}
                  </p>
                </Link>
                <li>
                  <button
                    className="bg-white rounded-xl p-2 px-8 text-emerald-600 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 mt-3 text-xl m-3"
                    onClick={async () => {
                      if (!logStatus) {
                        alert("You must be logged in to delete a post!");
                        return;
                      }
                      await deleteDoc(doc(database, "todos", docSnapshot.id));
                    }}
                  >
                    Delete Post
                  </button>
                  <Link
                    to={`/${docSnapshot.id}/edit`}
                    className="bg-white rounded-xl p-2 px-8 text-emerald-600 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 mt-3 text-xl m-3"
                    onClick={() => {
                      setCurrentPostId(docSnapshot.id);
                      setPostContent(data.article);
                      setPostTitle(data.title);
                    }}
                  >
                    Edit Post
                  </Link>
                </li>
              </ul>
            </div>
          );
        }
      });
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-7xl font-bold uppercase text-blue-500 mb-[1rem] mt-[1rem]">
        Your Posts:
      </h1>
      {content}
    </div>
  );
}

export default UserBlogs;
