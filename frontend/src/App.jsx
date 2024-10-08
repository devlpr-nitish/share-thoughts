import { redirect, RouterProvider } from "react-router-dom";

import useFetchData from "./hooks/useFetchData";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
