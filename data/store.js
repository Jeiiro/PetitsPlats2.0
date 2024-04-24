import { recipes } from "./recipes.js";

export const store = {
  searchbarValue: "",

  selectedIngredients: [],

  selectedAppliances: [],

  selectedUtensils: [],

  recipesStore: recipes,

  addSearchValue(item) {
    this.searchbarValue = item;
  },

  addRecipesStore(item) {
    this.recipesStore = item;
  },

  addFilter(category, item) {
    this[category].push(item);
  },

  deleteFilter(category, item) {
    this[category] = this[category].filter((elt) => elt !== item);
    console.log(category, item);
  },
};
