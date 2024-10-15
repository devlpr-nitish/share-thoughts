import { useRef } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { profileIconRef, showProfileMenu } from "../../store/atoms/atom";
import ProfileMenu from "./components/ProfileMenu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom";

const Navbar = () => {
 
  

  return (
    <>
      <div className="w-full h-10 relative bg-blue-700 text-white shadow-md shadow-gray-400 flex items-center justify-between px-5">
        <div className="text-xl font-bold hover:scale-95 duration-300 transition-all ease-in cursor-pointer">
          SHARE THOUGHTS
        </div>
        <Comp />
        {/* <div>
          <FontAwesomeIcon
            icon={faUserCircle}
            className="text-xl"
            ref={profileIconRef}
            onClick={handleProfileMenu}
          />
          {showProfileCard && <ProfileMenu profileIconRef={profileIconRef} />}
        </div> */}
      </div>
    </>
  );
};

const Comp = () => {
  const showProfileCard = useRecoilValue(showProfileMenu);
  const setShowProfileMenu = useSetRecoilState(showProfileMenu);

  const profileIconRef = useRef(null);

  const handleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={faUserCircle}
        className="text-xl"
        ref={profileIconRef}
        onClick={handleProfileMenu}
      />
      {showProfileCard && <ProfileMenu profileIconRef={profileIconRef} />}
    </div>
  )
}

export default Navbar;
