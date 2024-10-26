import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "./recoil/atom";

import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const App = () => {
  const auth = useRecoilValue(authState);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={auth.token ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
