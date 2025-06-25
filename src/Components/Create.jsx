import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { useUser } from "../contexts/userContext";
import bg from "../assets/backgroounds.jpg"

export default function Create() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    tips: "",
    tags: "",
    media: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setFormData((prev) => ({ ...prev, media: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a recipe.");
      navigate("/Login");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("ingredients", formData.ingredients);
    form.append("tips", formData.tips);
    form.append("tags", formData.tags);
    form.append("media", formData.media);
    form.append("userEmail", user.email);

    try {
      const res = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Recipe created successfully!");
        navigate("/");
      } else {
        alert(data.message || "Failed to create recipe.");
      }
    } catch (err) {
      console.error("Error:", err);
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
                        alignItems: 'center'}}
    >
        <div id="subdivofpage">
      <h2 style={{ textAlign: "center" , color:"#303c6c"}}>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name" style={{ fontSize: "20px" }}>
                  Recipe Name
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Recipe name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ height: "35px", width: "300px" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="ingredients" style={{ fontSize: "20px" }}>
                  Ingredients
                </label>
              </td>
              <td>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  placeholder="Ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  required
                  rows={4}
                  style={{ width: "300px" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tips" style={{ fontSize: "20px" }}>
                  Tips
                </label>
              </td>
              <td>
                <textarea
                  id="tips"
                  name="tips"
                  placeholder="Tips"
                  value={formData.tips}
                  onChange={handleChange}
                  rows={3}
                  required
                  style={{ width: "300px" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tags" style={{ fontSize: "20px" }}>
                  Tags
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Tags (comma-separated)"
                  value={formData.tags}
                  onChange={handleChange}
                  style={{ height: "35px", width: "300px" }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="media" style={{ fontSize: "20px" }}>
                  Upload Media
                </label>
              </td>
              <td>
                <input
                  type="file"
                  id="media"
                  name="media"
                  accept="image/*,video/*"
                  onChange={handleChange}
                  required
                  style={{ width: "300px" }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center", paddingTop: "10px" }}>
                <button
                  type="submit"
                  style={{
                    height: "40px",
                    width: "120px",
                    borderRadius: "25px",
                    backgroundColor: "#c4dbF6",
                    color: "Black",
                    border: "none",
                    cursor: "pointer"
                  }}
                  id="updatecreatebtn"
                >
                  Add Recipe
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
