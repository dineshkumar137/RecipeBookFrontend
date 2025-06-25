import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import "./Create.css";
import bg from "../assets/backgroounds.jpg";

export default function Update() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const recipe = location.state;

  const [formData, setFormData] = useState({
    name: recipe?.name || "",
    ingredients: recipe?.ingredients || "",
    tips: recipe?.tips || "",
    tags: recipe?.tags?.join(", ") || ""
  });

  useEffect(() => {
    if (!recipe) {
      alert("No recipe data provided. Redirecting...");
      navigate("/Myrecipe");
    }
  }, [recipe, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim())
    };

    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${recipe._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (res.ok) {
        alert("Recipe updated successfully!");
        navigate("/Myrecipe");
      } else {
        alert("Failed to update recipe.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="create-container"
      style={{
        height: '100vh',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div id="subdivofpage">
        <h2 style={{ textAlign: "center", color: "#303c6c" }}>Update Recipe</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="name" style={{ fontSize: "20px" }}>Recipe Name</label></td>
                <td>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ height: "35px", width: "300px" }}
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="ingredients" style={{ fontSize: "20px" }}>Ingredients</label></td>
                <td>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                    rows={4}
                    style={{ width: "300px" }}
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="tips" style={{ fontSize: "20px" }}>Tips</label></td>
                <td>
                  <textarea
                    id="tips"
                    name="tips"
                    value={formData.tips}
                    onChange={handleChange}
                    rows={3}
                    required
                    style={{ width: "300px" }}
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="tags" style={{ fontSize: "20px" }}>Tags</label></td>
                <td>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Tags (comma-separated)"
                    style={{ height: "35px", width: "300px" }}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ textAlign: "center", paddingTop: "20px" }}>
                  <button
                    type="submit"
                    style={{
                      height: "40px",
                      width: "120px",
                      borderRadius: "25px",
                      backgroundColor: "#c4dbF6",
                      color: "Black",
                      border: "none",
                      cursor: "pointer",
                    }}

                    id="updatecreatebtn"
                  >
                    Update Recipe
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}
