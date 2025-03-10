import { useState, useEffect } from "react";

const UpdateItem = ({ item }) => {
  const [updatedItem, setUpdatedItem] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) {
      setUpdatedItem({ name: item.name, description: item.description });
    }
  }, [item]);

  const handleChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update item");
        return res.json();
      })
      .then((data) => {
        alert("Item updated successfully!");
      })
      .catch((err) => setError(err.message));
  };

  if (!item) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Update Item</h2>
      <p>Current Name: {item.name}</p>
      <p>Current Description: {item.description}</p>
      <input
        type="text"
        name="name"
        value={updatedItem.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={updatedItem.description}
        onChange={handleChange}
      />
      <button onClick={handleUpdate}>Update Item</button>
    </div>
  );
};

export default UpdateItem;
