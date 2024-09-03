import { useState, useEffect } from "react";

const url = "http://localhost:3000";

const App = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${url}/`)
      .then((res) => res.text())
      .then((data) => setData(data))
      .catch((err) => console.log("Error fetching url:", err));
  }, []);

  return <div>{data}</div>;
};

export default App;
