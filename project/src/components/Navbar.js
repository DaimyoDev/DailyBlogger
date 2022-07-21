import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex flex-row">
      <h1>DailyBlogger</h1>
      <ul>
        <li>
          <Link to={"/about"}>
            <h1>Hi</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
