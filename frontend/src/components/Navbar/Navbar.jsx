import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="w-full h-[50px] px-5 py-2 shadow-md shadow-gray-200 flex items-center justify-between">
      {/* LOGO */}
      <div>
        <p className="text-3xl font-bold text-blue-600 cursor-pointer">
          ShareThoughts
        </p>
      </div>
      {/* Search Bar */}
      <div className="w-[300px] h-full flex items-center justify-center gap-3 bg-gray-200 text-lg border-2 focus-within:border-blue-500 px-4 py-2 rounded-3xl">
        <span className="">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-gray-500 cursor-pointer active:scale-90"
          />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none border-none bg-transparent"
        />
      </div>
      {/* Nav Links */}
      <div className="flex gap-3 items-center justify-center text-xl">
        <NavLink>
          <FontAwesomeIcon icon={faBars} />
        </NavLink>
        <NavLink>
          <FontAwesomeIcon icon={faMessage} />
        </NavLink>
        <NavLink>
          <FontAwesomeIcon icon={faBell} />
        </NavLink>
        <NavLink>
          <p className="text-xl font-bold">S</p>
        </NavLink>
      </div>
    </div>
  );
};

function NavLink({ children }) {
  return (
    <div className="w-10 h-10 rounded-[100%] grid place-items-center bg-gray-200 hover:bg-gray-300 active:scale-95 active:text-blue-700 cursor-pointer">
      {children}
    </div>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Navbar;
