import paneer from './assets/Paneer.jpg';
import briyani from './assets/briyani.jpg';
import icec from './assets/icec.jpg';
import jamun from './assets/jamun.jpg';
import frice from "./assets/frice.jpg";
import dosa from "./assets/dosa.jpg";

export const sampleDishes = [
  {
    name: "Paneer Butter Masala",
    image: paneer,
    ingredients: "Paneer, Tomato, Cream, Spices",
    steps: "Cook onion-tomato paste, add spices, add paneer, simmer with cream.",
    tips: "Use fresh cream for rich flavor.",
    tags: ["curry", "vegetarian"]
  },
  {
    name: "Ice Cream",
    image: icec,
    ingredients: "Milk, Cream, Sugar, Flavor",
    steps: "Churn mixture, freeze till set.",
    tips: "Don’t overchurn, keep it creamy.",
    tags: ["dessert", "cold"]
  },
  {
    name: "Gulab Jamun",
    image: jamun,
    ingredients: "Khoya, Sugar, Cardamom, Rose Water",
    steps: "Make balls from khoya, fry them, soak in sugar syrup.",
    tips: "Let syrup be warm, not hot.",
    tags: ["dessert", "sweet"]
  },
  {
    name: "Biryani",
    image: briyani,
    ingredients: "Rice, Meat/Veggies, Spices",
    steps: "Layer rice and curry, cook on dum.",
    tips: "Soak rice 30 mins before cooking.",
    tags: ["main", "spicy"]
  },
  {
      name: "Fried Rice",
      image: frice,
      ingredients: "Rice, Veggies, Soy Sauce, Oil",
      steps: "Stir-fry veggies, add rice, toss with sauces.",
      tips: "Use cold rice for best results.",
      tags: ["rice", "quick"]
    },
    {
        name: "Dosa",
        image: dosa,
        ingredients: "Rice, Urad Dal, Oil",
        steps: "Ferment batter, spread on pan, cook crisp.",
        tips: "Use cast iron pan for best crispiness.",
        tags: ["breakfast", "crispy"]
    }
];
