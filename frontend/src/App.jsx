import { redirect } from "react-router-dom";

import useFetchData from "./hooks/useFetchData";
import AppRoutes from "./routes/AppRoutes";

import { backendUrl } from "./store/atoms/atom";

const App = () => {
  const token = localStorage.getItem("token");

  const { /* data */ loading, error } = useFetchData(backendUrl);

  if (!token) {
    redirect("/signin");
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;
