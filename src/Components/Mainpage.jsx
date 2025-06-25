import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext"; 
import "./Mainpage.css";
import paneer from "../assets/Paneer.jpg";
import briyani from "../assets/briyani.jpg";
import icec from "../assets/icec.mp4";
import jamun from "../assets/gj.mp4";
import pizza from "../assets/pizza.mp4";
import frice from "../assets/frice.jpg";
import dosa from "../assets/dosa.jpg";
import paratha from "../assets/paratha.jpg";
import sand from "../assets/sandwich.jpg";
import samosa from "../assets/vegsamo.jpeg";
import salad from "../assets/salad.jpg";
import lasi from "../assets/lasi.jpg";
import crosi from "../assets/crois.jpg";
import csuz from "../assets/csuz.jpg";
import fosoup from "../assets/fosoupjpg.jpg";


export const sampleDishes = [
  {
    name: "Paneer Butter Masala",
    image: paneer,
    type: "image",
    ingredients: "Paneer, Tomato, Cream, Spices",
    steps: "Cook onion-tomato paste, add spices, add paneer, simmer with cream.",
    tips: "Use fresh cream for rich flavor.",
    tags: ["curry", "vegetarian"]
  },
  {
    name: "Pizza",
    image: pizza,
    type: "video",
    ingredients: "Flour, Yeast, Cheese, Tomato Sauce, Veggies",
    steps: "Prepare dough, spread sauce and toppings, bake at 200°C.",
    tips: "Preheat oven for a crispy crust.",
    tags: ["cheese", "snack"]
  },
  {
    name: "Gulab Jamun",
    image: jamun,
    type: "video",
    ingredients: "Khoya, Sugar, Cardamom, Rose Water",
    steps: "Make balls from khoya, fry them, soak in sugar syrup.",
    tips: "Let syrup be warm, not hot.",
    tags: ["dessert", "sweet"]
  },
  {
    name: "Fried Rice",
    image: frice,
    type: "image",
    ingredients: "Rice, Veggies, Soy Sauce, Oil",
    steps: "Stir-fry veggies, add rice, toss with sauces.",
    tips: "Use cold rice for best results.",
    tags: ["rice", "quick"]
  },
  {
    name: "Dosa",
    image: dosa,
    type: "image",
    ingredients: "Rice, Urad Dal, Oil",
    steps: "Ferment batter, spread on pan, cook crisp.",
    tips: "Use cast iron pan for best crispiness.",
    tags: ["breakfast", "crispy"]
  },
  {
    name: "Ice Cream",
    image: icec,
    type: "video",
    ingredients: "Milk, Cream, Sugar, Flavor",
    steps: "Churn mixture, freeze till set.",
    tips: "Don’t overchurn, keep it creamy.",
    tags: ["dessert", "cold"]
  },
  {
    name: "Paratha",
    image: paratha,
    type: "image",
    ingredients: "Wheat Flour, Stuffing, Ghee",
    steps: "Roll dough with filling, roast on tawa.",
    tips: "Seal edges to avoid leaking filling.",
    tags: ["flatbread", "stuffed"]
  },
  {
    name: "Biryani",
    image: briyani,
    type: "image",
    ingredients: "Rice, Meat/Veggies, Spices",
    steps: "Layer rice and curry, cook on dum.",
    tips: "Soak rice 30 mins before cooking.",
    tags: ["spicy", "main"]
  },
  {
    name: "Sandwich",
    image: sand,
    type: "image",
    ingredients: "Bread, Fillings, Sauces",
    steps: "Assemble ingredients between bread slices.",
    tips: "Grill for extra taste.",
    tags: ["snack", "quick"]
  },
  {
    name: "Samosa",
    image: samosa,
    type: "image",
    ingredients: "Flour, Potato, Spices, Oil",
    steps: "Stuff dough, shape cone, deep fry.",
    tips: "Keep oil medium-hot to avoid burning.",
    tags: ["snack", "crispy"]
  },
  {
    name: "Lassi",
    image: lasi,
    type: "image",
    ingredients: "Curd, Sugar, Cardamom",
    steps: "Blend everything with water.",
    tips: "Serve chilled with saffron.",
    tags: ["drink", "cool"]
  },
  {
    name: "Salad",
    image: salad,
    type: "image",
    ingredients: "Veggies, Dressing",
    steps: "Chop and mix everything.",
    tips: "Add lemon juice for zest.",
    tags: ["healthy", "diet"]
  },
  {
    name: "Croissant",
    image: crosi,
    type: "image",
    ingredients: "Flour, Butter, Yeast, Milk, Sugar, Salt",
    steps: "Prepare dough, fold with butter multiple times, chill, shape, and bake.",
    tips: "Use cold butter and chill between folds for flaky layers.",
    tags: ["pastry", "paris","breakfast"]
  },
  {
    name : "French Onion Soup",
    image: fosoup,
    type: "image",
    ingredients: "Onions, Beef Broth, Butter, Cheese, Bread, Thyme",
    steps: "Caramelize onions, add broth, simmer, serve with toasted bread and cheese on top.",
    tips: "Caramelize onions slowly for deep flavor.",
    tags: ["soup", "starter", "paris"]

  },
  {
    name : "Crepes Suzette",
    image: csuz,
    type: "image",
    ingredients: "Flour, Eggs, Milk, Butter, Orange Juice, Sugar, Grand Marnier",
    steps: "Make thin crepes, prepare orange-flavored caramel sauce, flambé with liqueur.",
    tips: "Use a non-stick pan and flambé just before serving.",
    tags: ["dessert", "sweet", "paris"]
  }
];

export default function Mainpage() {
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const shuffled = [...sampleDishes].sort(() => Math.random() - 0.5);
    setDishes(shuffled);
  }, []);

  const handleDishClick = (dish) => {
    if (!user) {
      alert("Please login first to view recipe details.");
      navigate("/Login");
    } else {
      navigate("/Preparation", { state: dish });
    }
  };

  return (
    <div id="gridcontainer">

        {user && (
      <div className="user-pill-wrapper">
        <div className="user-pill">
          <span className="pill-label">{user.email}</span>
          <div className="pill-buttons">
            <button onClick={() => navigate("/Create")}>Create</button>
            <button onClick={() => navigate("/Myrecipe")}>My Recipe</button>
          </div>
        </div>
      </div>
    )}

      {dishes.map((dish, index) => (
  <div
    key={index}
    className="dish-card"
    onClick={() => handleDishClick(dish)}
  >
    {dish.type === "video" ? (
      <video
        src={dish.image}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <img
        src={dish.image}
        alt={dish.name}
        style={{ width: "100%", height: "100%", objectFit: "cover"}}
      />
    )}
    <div className="overlay">
      <h4>{dish.name}</h4>
    </div>
  </div>
))}
 
        
    </div>
  );
}
