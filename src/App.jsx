import React, { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// /doors will give you all the doors, to get a specific door use /doors/1.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);
  console.log("Fetching from:", API_URI);
  useEffect(() => {
    fetch(`${API_URI}/1`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((error) => console.error("Error fetching item:", error));
  }, []);

  return <UpdateItem item={item} />;
}

export default App;