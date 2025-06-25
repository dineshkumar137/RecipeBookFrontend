import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/userContext"; 

export default function Save() {
  const { user } = useUser(); 
  const [savedDishes, setSavedDishes] = useState([]);

  useEffect(() => {
    if (user) {
      const allRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || {};
      const userRecipes = allRecipes[user.email] || [];
      setSavedDishes(userRecipes);
    } else {
      setSavedDishes([]);
    }
  }, [user]);

  if (!user) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Please login to view saved recipes.
      </h2>
    );
  }

  if (savedDishes.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No recipes saved yet.
      </h2>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: "20px",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {savedDishes.map((dish, index) => (
        <div
          key={index}
          style={{
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <img
            src={dish.image}
            alt={dish.name}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <div style={{ padding: "10px" }}>
            <h3>{dish.name}</h3>
            <p>
              <strong>Ingredients:</strong> {dish.ingredients}
            </p>
            <p>
              <strong>Tips:</strong> {dish.tips}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
