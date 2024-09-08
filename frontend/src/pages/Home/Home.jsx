import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full mt-20 flex justify-center ">
        <div className="w-[300px] border-2 border-blue-600 rounded-md shadow-md shadow-blue-300 px-2 py-1 flex items-center gap-2 justify-center">
          <FontAwesomeIcon icon={faHand} className="text-yellow-500 text-xl" />
          <span className="text-xl">Share your thoughts</span>
        </div>
      </div>
    </>
  );
};

export default Home;
