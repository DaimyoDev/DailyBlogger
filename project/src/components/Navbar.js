import React from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import useStore from "../store";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const logStatus = useStore((state) => state.loggedIn);
  const toggleLoggedIn = useStore((state) => state.toggleLoggedIn);
  const userPhoto = useStore((state) => state.userPhoto);
  const setUserPhoto = useStore((state) => state.setUserPhoto);
  const displayName = useStore((state) => state.displayName);
  const setDisplayName = useStore((state) => state.setDisplayName);
  let navigate = useNavigate();

  return (
    <div className="flex tablet:flex-row w-screen bg-sky-800 tablet:h-[5rem] shadow-sm shadow-zinc-500 flex-col h-fit py-3 tablet:py-0">
      <h1 className="text-emerald-300 table:mr-[25rem] tablet:ml-[5rem] mt-[0.5rem] text-5xl font-bold mr-[0.3rem] ml-[0.3rem] self-center tablet:self-start tablet:mt[2rem]">
        Daily<span className="text-sky-300">Blogger</span>
      </h1>
      <ul className="flex tablet:flex-row justify-center text-emerald-600 text-xl items-center flex-col w-screen">
        {/* <li className="bg-white rounded-xl p-2 px-8 mr-[3rem] hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700">
          <Link to={"/about"}>
            <p>About</p>
          </Link>
        </li> */}
        <li className="bg-white rounded-xl p-2 px-8 tablet:mr-[3rem] mt-5 tablet:mt-0 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700 mr-[0.3rem]">
          <Link to={""}>
            <p>Posts</p>
          </Link>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 tablet:mr-[3rem] mr-[0.3rem] mt-3 tablet:mt-0 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700"
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
            <p>Sign In</p>
          </button>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 tablet:mr-[3rem] mr-[0.3rem] mt-3 tablet:mt-0 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700"
          hidden={logStatus ? false : true}
        >
          <button
            onClick={() => {
              signOut(auth);
              toggleLoggedIn(false);
              navigate("");
            }}
          >
            <p>Sign Out</p>
          </button>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 tablet:mr-[3rem] mr-[0.3rem] mt-3 tablet:mt-0 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700"
          hidden={logStatus ? false : true}
        >
          <Link to={"/myposts"}>
            <p>My Posts</p>
          </Link>
        </li>
        <li
          className="bg-white rounded-xl p-2 px-8 tablet:mr-[3rem] mr-[0.3rem] mt-3 tablet:mt-0 hover:bg-blue-900 transition-all duration-300 shadow-lg shadow-zinc-700"
          hidden={logStatus ? false : true}
        >
          <Link to={"/createposts"}>
            <p>Create Posts</p>
          </Link>
        </li>
        <li
          hidden={logStatus ? false : true}
          className="w-14 flex flex-row text-white font-semi-bold"
        >
          <img
            src={userPhoto}
            alt=""
            className={logStatus ? "rounded-full" : "hide"}
          ></img>
          <p className="ml-2" hidden={logStatus ? false : true}>
            {displayName}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
