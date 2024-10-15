import { Suspense, lazy } from "react";
import { Routes, Route, createBrowserRouter } from "react-router-dom";

// import Signin from "../pages/Signin/Signin";
const Signin = lazy(() => import("../pages/Signin/Signin"));
const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
const Home = lazy(() => import("../pages/Home/Home"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  );
};



export default AppRoutes;
