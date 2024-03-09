import { recipes } from '../data/recipes.js';
import { displayRecipes } from '../ui/recipes.js';

/**
 * Fonction pour filtrer les recettes en fonction de la recherche de l'utilisateur et les afficher.
 */
export function filterAndDisplayRecipes() {
  const searchBar = document.querySelector('#searchbar');
  const searchInput = searchBar.querySelector('input');
  const searchValue = searchInput.value.trim().toLowerCase();

  // Copie du tableau initial des recettes
  let filteredRecipes = [...recipes];
  
  // Filtrer les recettes si la longueur de la recherche est supérieure à 2 caractères
  if (searchValue.length > 2) {
    // Utilisation de la méthode filter pour filtrer les recettes
    filteredRecipes = filteredRecipes.filter(recipe => {
      // Vérifier si le nom de la recette inclut la valeur de recherche
      if (recipe.name.toLowerCase().includes(searchValue)) {
        return true;
      }
      
      // Vérifier si la recherche correspond à l'un des ingrédients de la recette
      const ingredientMatch = recipe.ingredients.some(ingredient => {
        return ingredient.ingredient.toLowerCase().includes(searchValue);
      });

      if (ingredientMatch) {
        return true;
      }

      // Vérifier si la description de la recette inclut la valeur de recherche
      return recipe.description.toLowerCase().includes(searchValue);
    });
  }
  
  // Afficher les recettes filtrées
  displayRecipes(filteredRecipes);
}