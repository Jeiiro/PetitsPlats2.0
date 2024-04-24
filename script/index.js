import { recipes } from "../data/recipes.js";
import { recipeCard } from "./templates/card.js";
import { dropdown } from "./utils/filters/dropDown.js";
import { validSearchField } from "./utils/validSearch.js";

let recipeObject = {};

const cardsContainer = document.getElementById("cardsContainer");

recipes.forEach((recipe) => {
  recipeObject = recipe;

  const card = new recipeCard(recipeObject);
  const recipeArticles = card.getArticleDOM();

  cardsContainer.appendChild(recipeArticles);
  card.ingredientList();
});

const searchInput = document.getElementById("searchbarInput");
const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
validSearchField(searchInput, recipes);

dropdown();
