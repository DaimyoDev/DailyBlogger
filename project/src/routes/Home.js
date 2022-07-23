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
          <Link to={`/${docSnapshot.id}`}>
            <div
              key={docSnapshot.id}
              className=" m-5 w-[50rem] m-h-[15rem] flex flex-col text-center bg-sky-700 p-4 py-10 text-xl rounded-lg shadow-lg shadow-zinc-900 hover:bg-blue-900 transition-all duration-300"
            >
              <ul>
                <p className="text-5xl font-bold uppercase text-emerald-300 mb-[2rem]">
                  {data.title}
                </p>
                <p className="text-white text-lg leading-[2rem] mb-[0.3rem]">
                  {data.article}
                </p>
                <p className="text-emerald-300 text-xl mb-2">
                  Author: {data.author}
                </p>
              </ul>
            </div>
          </Link>
        );
      });
    }
  }

  return (
    <div className="App flex flex-col items-center h-screen">
      <h1 className="text-7xl font-bold uppercase text-blue-500 mb-[1rem] mt-[1rem]">
        All Posts:
      </h1>
      {content}
    </div>
  );
}

export default Home;
