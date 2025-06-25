import React, { useState } from "react";
import savelogo from "../assets/bookmark.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { sampleDishes } from "../data"; 
import { useUser } from "../contexts/userContext"; 

export default function Header() {
  const { user, logout } = useUser();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (!value.trim()) {
      setFiltered([]);
      return;
    }

    const results = sampleDishes.filter(
      (d) =>
        d.name.toLowerCase().includes(value) ||
        (d.tags && d.tags.some((tag) => tag.toLowerCase().includes(value)))
    );

    setFiltered(results);
  };

  const handleResultClick = (dish) => {
    setQuery("");
    setFiltered([]);
    navigate("/Preparation", { state: dish });
  };

  const handleSavedClick = () => {
    if (user) {
      navigate("/saved");
    } else {
      alert("Please login to access saved recipes");
      navigate("/Login");
    }
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/Login");
    }
  };

  return (
    <>
      <nav id="navibar">
        <div style={{ paddingLeft: "70px", display: "flex", alignItems: "center", gap: "10px" }}>
          <h3 style={{ fontSize: "x-large" }} id="recipebookhead">RECIPE BOOK</h3>
          <div className="hamburger">☰</div>
        </div>

        <div>
          <input
            type="search"
            placeholder="Search recipe"
            className="navisearch"
            value={query}
            onChange={handleSearch}
          />
        </div>

        <div>
          <img
            src={savelogo}
            alt="saved recipes"
            title="saved recipes"
            className="navimagesave"
            onClick={handleSavedClick}
          />
        </div>

        <div>
          <button className="navibutton" onClick={handleAuthClick} style={{borderRadius:"25px", marginRight:"55px"}}>
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </nav>

      {filtered.length > 0 && (
        <div className="floating-dropdown">
          <ul>
            {filtered.map((dish, index) => (
              <li key={index} onClick={() => handleResultClick(dish)}>
                {dish.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
