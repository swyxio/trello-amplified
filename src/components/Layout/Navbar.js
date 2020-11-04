import React from "react";
import { Link } from "react-router-dom";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const Navbar = () => {
  return (
    <header className="bg-gray-900">
      <div className="container px-20 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
        <Link
          to="/"
          className="flex title-font font-bold items-center text-white mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">TRELLO-AMPLIFIED</span>
        </Link>
        <nav className="md:ml-auto">
          <ul className="flex text-xl items-center justify-center text-white flex-wrap">
            <li className="mr-5 hover:text-blue-600">
              <Link to="/about">About</Link>
            </li>
            <li className="mr-5 hover:text-blue-600">
              <Link to="/boards">Boards</Link>
            </li>
            <li>
              <AmplifySignOut buttonText="Sign Out" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
