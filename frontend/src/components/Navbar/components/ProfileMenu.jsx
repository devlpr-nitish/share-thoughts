import { useEffect, useRef } from "react";

import { useSetRecoilState } from "recoil";
import { showProfileMenu } from "../../../store/atoms/atom";

const ProfileMenu = ({ profileIconRef }) => {
  const setShowProfileMenu = useSetRecoilState(showProfileMenu);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowProfileMenu]);

  return (
    <div
      ref={menuRef}
      className="border-1 border-black rounded-md  w-[300px] h-[300px] flex items-center justify-center absolute top-12 right-4 bg-blue-200 shadow-md shadow-gray-200"
    >
      {" "}
      profileMenu
    </div>
  );
};

export default ProfileMenu;
