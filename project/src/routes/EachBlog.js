import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import useStore from "../store";

function EachBlog() {
  const currentBlog = useLocation();
  const docRef = doc(database, "todos", currentBlog.pathname);
  const [content, setContent] = useState();
  const logStatus = useStore((state) => state.loggedIn);

  useMemo(() => {
    const docSnapshot = async () => {
      const docData = await getDoc(docRef);
      if (docData !== null) {
        const finalData = docData.data();
        if (finalData !== undefined) {
          setContent(
            <div className="flex flex-col justify-center text-emerald-600 text-xl items-center">
              <h2 className="uppercase tablet:text-7xl text-sky-500 m-3 text-2xl">
                {finalData.title}
              </h2>
              <h3 className="text-white text-2xl mt-6 mb-6 tablet:w-[70rem] w-fit text-center">
                {finalData.article}
              </h3>
              <h3 className="text-emerald-400 text-3xl mt-6 mb-6">
                Author: {finalData.author}
              </h3>
            </div>
          );
        }
      }
    };
    docSnapshot();
  }, [setContent]);

  return (
    <div className="flex flex-col w-screen items-center bg-sky-700 h-screen">
      {content}
      <ul>
        <Link
          to="/"
          className="bg-white rounded-xl p-2 px-8 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 text-emerald-400 text-xl"
        >
          Back To All Posts
        </Link>
        <Link
          to="/myposts"
          hidden={logStatus ? false : true}
          className="bg-white rounded-xl p-2 px-8 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 text-emerald-400 text-xl ml-10"
        >
          Back To Your Posts
        </Link>
      </ul>
    </div>
  );
}

export default EachBlog;
