import React from "react";
import { Link } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const Navbar = () => {
  return (
    <header>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-bold items-center text-gray-900 mb-4 md:mb-0"
        >
          <span class="ml-3 text-xl">TRELLO-AMPLIFIED</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <ul className="flex text-xl items-center">
            <li className="mr-5 hover:text-gray-900">
              <Link to="/about">About</Link>
            </li>
            <li className="mr-5 hover:text-gray-900">
              <Link to="/boards">Boards</Link>
            </li>
            <li className="">
              <AmplifySignOut
                className="rounded"
                button-text="Sign Out"
              ></AmplifySignOut>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
