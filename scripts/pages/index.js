import { recipes } from '../data/recipes.js';
import { displayRecipes } from '../ui/recipes.js';
import { filterAndDisplayRecipes } from '../ui/search.js';

window.addEventListener('load', () => {
    const searchBar = document.querySelector('#searchbar');
    const searchInput = searchBar.querySelector('input');
    const searchClose = searchBar.querySelector("svg");

    searchInput.addEventListener("input", () => {
        searchClose.style.display = searchInput.value ? "block" : "none";
        filterAndDisplayRecipes();
    });
    searchClose.addEventListener("click", () => {
        searchInput.value = "";
        searchClose.style.display = "none";
    });
    displayRecipes(recipes);
});