import React from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import useStore from "../store";
import "./Navbar.css";

function Navbar() {
  const logStatus = useStore((state) => state.loggedIn);
  const toggleLoggedIn = useStore((state) => state.toggleLoggedIn);
  const userPhoto = useStore((state) => state.userPhoto);
  const setUserPhoto = useStore((state) => state.setUserPhoto);
  const displayName = useStore((state) => state.displayName);
  const setDisplayName = useStore((state) => state.setDisplayName);

  return (
    <div className="flex flex-row w-screen bg-sky-500 h-[5rem]">
      <h1 className="text-emerald-300 mr-[30rem] ml-[5rem] mt-[1.3rem] text-3xl font-bold">
        DailyBlogger
      </h1>
      <ul className="flex flex-row justify-center text-emerald-600 text-xl items-center">
        <li className="bg-white rounded-xl p-2 px-8 mr-[3rem]">
          <Link to={"/about"}>
            <h1>About</h1>
          </Link>
        </li>
        <li className="bg-white rounded-xl p-2 px-8 mr-[3rem]">
          <Link to={""}>
            <h1>Posts</h1>
          </Link>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 mr-[3rem]"
          hidden={logStatus ? true : false}
        >
          <button
            onClick={() => {
              const google = new GoogleAuthProvider();
              signInWithPopup(auth, google).then((response) => {
                setUserPhoto(response.user.photoURL);
                setDisplayName(response.user.displayName);
                toggleLoggedIn(true);
              });
            }}
          >
            <h1>Sign In</h1>
          </button>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 mr-[3rem]"
          hidden={logStatus ? false : true}
        >
          <button
            onClick={() => {
              signOut(auth);
              toggleLoggedIn(false);
            }}
          >
            <h1>Sign Out</h1>
          </button>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 mr-[3rem]"
          hidden={logStatus ? false : true}
        >
          <Link to={"/myposts"}>
            <h1>My Posts</h1>
          </Link>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 mr-[3rem]"
          hidden={logStatus ? false : true}
        >
          <Link to={"/createposts"}>
            <h1>Create Posts</h1>
          </Link>
        </li>
        <li
          hidden={logStatus ? false : true}
          className="w-14 flex flex-row text-white font-semi-bold"
        >
          <img src={userPhoto} alt="" className={logStatus ? "" : "hide"}></img>
          <h1 className="ml-2" hidden={logStatus ? false : true}>
            {displayName}
          </h1>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
