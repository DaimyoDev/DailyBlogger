import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function EachBlog() {
  const currentBlog = useLocation();
  const docRef = doc(database, "todos", currentBlog.pathname);
  const [content, setContent] = useState();

  useMemo(() => {
    const docSnapshot = async () => {
      const docData = await getDoc(docRef);
      if (docData !== null) {
        const finalData = docData.data();
        if (finalData !== undefined) {
          setContent(
            <div>
              <h3>{finalData.title}</h3>
              <h3>{finalData.article}</h3>
              <h3>{finalData.author}</h3>
            </div>
          );
        }
      }
    };
    docSnapshot();
  }, [setContent]);

  return <div>{content}</div>;
}

export default EachBlog;
