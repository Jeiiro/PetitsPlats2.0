import { updateDropdownContent } from '../utils/dom.js';

/**
 * Affiche les recettes dans l'interface utilisateur.
 * @param {Array} recipes La liste des recettes à afficher.
 */
export function displayRecipes(recipes) {
    const template = document.querySelector("#recipeCard");
    const container = document.querySelector("#recipes");
    container.innerHTML = ''; // Effacer le contenu actuel de la zone d'affichage des recettes
    const totalRecipes = recipes.length;
  
    // Modifier le contenu de l'élément indiquant le nombre total de recettes
    const totalRecipesElement = document.getElementById('totalRecipes');
    totalRecipesElement.textContent = `${totalRecipes} recettes`;

    const ingredientField = document.querySelector('[name="ingredientField"]');
    const applianceField = document.querySelector('[name="ingredientField"]');
    const utensilField = document.querySelector('[name="ingredientField"]');
  
    // Récupérer la liste d'ingrédients, d'appareils et d'ustensiles
    let ingredientsList = [];
    let appliancesList = [];
    let utensilsList = [];

    // Créer une copie de chacune des listes
    let originalOrderIngredientsList = [...ingredientsList];
    let originalOrderAppliancesList = [...appliancesList];
    let originalOrderUtensilsList = [...utensilsList];
  
    // Utilisation de boucles for pour parcourir les recettes et leurs ingrédients, appareils, ustensiles
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      
      // Ajouter les ingrédients à la liste d'ingrédients si ils n'y sont pas encore
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient;
        if (!ingredientsList.includes(ingredient)) {
          ingredientsList.push(ingredient);
        }
      }

      // Filtrer une liste d'ingrédients en fonction de ce qui est saisi dans un champ de recherche
      ingredientField.addEventListener('input', function() {
        let searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 3) {
          ingredientsList = ingredientsList.filter(ingredient =>
            ingredient.toLowerCase().startsWith(searchTerm)
          );
          //updateIngredientList();
        } else {
          ingredientsList = [...originalOrderIngredientsList];
          //updateIngredientList();
        }
      });
      
      // Ajouter les appareils à la liste d'appareils si ils n'y sont pas encore
      if (!appliancesList.includes(recipe.appliance)) {
        appliancesList.push(recipe.appliance);
      }

      // Filtrer une liste d'appareils en fonction de ce qui est saisi dans un champ de recherche
      applianceField.addEventListener('input', function() {
        let searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 3) {
          appliancesList = appliancesList.filter(appliance =>
            appliance.toLowerCase().startsWith(searchTerm)
          );
          //updateApplianceList();
        } else {
          appliancesList = [...originalOrderAppliancesList];
          //updateApplianceList();
        }
      });
  
      // Ajouter les ustensiles à la liste d'ustensiles si ils n'y sont pas encore
      for (let k = 0; k < recipe.ustensils.length; k++) {
        const utensil = recipe.ustensils[k];
        if (!utensilsList.includes(utensil)) {
          utensilsList.push(utensil);
        }
      }

      // Filtrer une liste d'ustensiles en fonction de ce qui est saisi dans un champ de recherche
      utensilField.addEventListener('input', function() {
        let searchTerm = this.value.toLowerCase();
        if (searchTerm.length >= 3) {
          utensilsList = utensilsList.filter(utensil =>
            utensil.toLowerCase().startsWith(searchTerm)
          );
          //updateUtensilList();
        } else {
          utensilsList = [...originalOrderUtensilsList];
          //updateUtensilList();
        }
      });
    }
  
    // Mettre à jour les menus déroulants avec les listes actuelles
    updateDropdownContent('ingredient', ingredientsList);
    updateDropdownContent('appliance', appliancesList);
    updateDropdownContent('utensil', utensilsList);
  
    // Si des recettes sont disponibles, les afficher
    if (recipes.length > 0) {
      // Utilisation d'une boucle for pour parcourir les recettes
      for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const clone = template.content.cloneNode(true);
  
        // Remplir les détails de la recette dans le template cloné
        clone.querySelector(".card-img-top").src = `assets/img/Recettes/Resized/${recipe.image}`;
        clone.querySelector(".card-img-top").alt = recipe.name;
        clone.querySelector(".badge").textContent = `${recipe.time} min`;
        clone.querySelector(".card-title").textContent = recipe.name;
        clone.querySelector(".card-text").textContent = recipe.description;
  
        // Afficher la liste des ingrédients
        const ingredientsList = clone.querySelector("#ingredientsList");
        recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${ingredient.ingredient} <span class="ingredient-quantity">${ingredient.quantity || ''} ${ingredient.unit || ''}</span>`;
            ingredientsList.appendChild(listItem);
        });
  
        container.appendChild(clone);
      }
    } else {
      // Si aucune recette ne correspond à la recherche, afficher un message
      container.innerHTML = '<p>Aucune recette trouvée.</p>';
    }
  }