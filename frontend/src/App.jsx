import useFetchData from "./hooks/useFetchData";

const url = "http://localhost:3000";

const App = () => {
  const { data, loading, error } = useFetchData(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
};

export default App;
