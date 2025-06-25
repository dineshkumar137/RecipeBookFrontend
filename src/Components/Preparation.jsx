import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Preparation() {
  const { state: dish } = useLocation();
  const navigate = useNavigate();

  
  const getLoggedInUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

 
  const handleSave = () => {
    const user = getLoggedInUser();

    if (!user) {
      alert("Please login first to save recipes.");
      navigate("/Login");
      return;
    }

    const allSaved = JSON.parse(localStorage.getItem("savedRecipes")) || {};
    const userEmail = user.email;

    
    const userSaved = allSaved[userEmail] || [];

 
    const alreadySaved = userSaved.some((item) => item.name === dish.name);

    if (alreadySaved) {
      alert("Recipe already saved.");
    } else {
      const updatedUserSaved = [...userSaved, dish];
      const updatedAllSaved = {
        ...allSaved,
        [userEmail]: updatedUserSaved,
      };

      localStorage.setItem("savedRecipes", JSON.stringify(updatedAllSaved));
      alert("Recipe saved successfully!");
    }
  };

  if (!dish) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No recipe selected.
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${dish.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "60px",
        color: "#fff",
        backdropFilter: "brightness(0.4)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "30px",
          borderRadius: "10px",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{dish.name}</h1>
        <hr />
        <h3>Ingredients</h3>
        <p>{dish.ingredients}</p>

        <h3>Preparation Steps</h3>
        <p>{dish.steps}</p>

        <h3>Tips</h3>
        <p>{dish.tips}</p>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            style={{
              backgroundColor: "#c4dbF6",
              color: "#000",
              padding: "10px 20px",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
            }}
            onClick={handleSave}
          >
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
