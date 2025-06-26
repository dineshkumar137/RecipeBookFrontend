import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext";
import "./Myrecipe.css";
import { useNavigate } from "react-router-dom";

export default function Myrecipe() {
  const { user } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", ingredients: "", tips: "", tags: "" });
  const navigate = useNavigate();


  useEffect(() => {
  if (!user || !user.email) return;

  fetch(`https://recipebookbackend-nexv.onrender.com/api//api/recipes/byemail/${user.email}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Fetched recipes:", data);
      if (Array.isArray(data)) setRecipes(data);
      else console.error("Expected array but got:", data);
    })
    .catch((err) => {
      console.error("Failed to load recipes", err);
      setRecipes([]);
    });
}, [user]);


  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/recipes/${id}`, { method: "DELETE" });
    setRecipes((prev) => prev.filter((r) => r._id !== id));
  };

  const handleEdit = (recipe) => {
  navigate("/Update", { state: recipe });
};

  const handleSave = async (id) => {
    await fetch(`http://localhost:5000/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEditId(null);
    // reload recipes
    const res = await fetch(`http://localhost:5000/api/recipes/${user.email}`);
    const updated = await res.json();
    setRecipes(updated);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="myrecipe-container">
    <h2>My Recipes</h2>
    {recipes.length === 0 && <p>No recipes created yet.</p>}
    <div className="myrecipe-grid">
      {Array.isArray(recipes) && recipes.map((recipe) => (
  <div key={recipe._id} className="myrecipe-card">
    {recipe.mediaUrl && recipe.mediaType === "image" && (
      <img src={`http://localhost:5000/${recipe.mediaUrl}`} alt={recipe.name} />
    )}
    {recipe.mediaUrl && recipe.mediaType === "video" && (
      <video src={`http://localhost:5000/${recipe.mediaUrl}`} controls />
    )}

    <div className="myrecipe-content">
      <h3>{recipe.name}</h3>
      <p><b>Ingredients:</b> {recipe.ingredients}</p>
      <p><b>Tips:</b> {recipe.tips}</p>
      <p><b>Tags:</b> {recipe.tags.join(", ")}</p>
      <div className="action-buttons">
        <button onClick={() => handleEdit(recipe)}>✏️</button>
        <button onClick={() => handleDelete(recipe._id)}>🗑️</button>
      </div>
    </div>
  </div>
))}
    </div>
  </div>
  );
}
