function filterAndDisplayRecipes() {
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

// Fonction pour afficher les recettes
function displayRecipes(recipes) {
  const template = document.querySelector("#recipeCard");
  const container = document.querySelector("#recipes");
  container.innerHTML = ''; // Effacer le contenu actuel de la zone d'affichage des recettes
  const totalRecipes = recipes.length;

  // Modifier le contenu de l'élément indiquant le nombre total de recettes
  //const totalRecipesElement = document.getElementById('totalRecipes');
  //totalRecipesElement.innerHTML = `<b>${totalRecipes} recettes</b>`;

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

// Fonction pour afficher la liste des ingrédients dans la dropdownlist correspondante
function displayIngredients() {
  const ingredientsDropdown = document.getElementById('ingredientsDropdown');
  console.log("ingredientsDropdown:", ingredientsDropdown);
  

  // Sélection de la liste déroulante
  const dropdownMenu = ingredientsDropdown.nextElementSibling;
  console.log("dropdownMenu:", dropdownMenu);

  // Nettoyer le contenu actuel de la liste déroulante
  dropdownMenu.innerHTML = '';

  // Boucle pour récupérer tous les ingrédients uniques
  const uniqueIngredients = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      if (!uniqueIngredients.includes(ingredient)) {
        uniqueIngredients.push(ingredient);
      }
    }
  }

  // Limiter la liste aux 5 premiers ingrédients
  const displayedIngredients = uniqueIngredients.slice(0, 6);

  // Afficher chaque ingrédient dans la dropdownlist
  displayedIngredients.forEach((ingredient, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a class="dropdown-item" href="#">${ingredient}</a>`;
    dropdownMenu.appendChild(listItem);
  });

  // Cacher visuellement les éléments supplémentaires
  uniqueIngredients.slice(5).forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a class="dropdown-item extra-item" href="#">${ingredient}</a>`;
    dropdownMenu.appendChild(listItem);
  });
}

// Exécuter le code lorsque la page est entièrement chargée
window.addEventListener('load', () => {
  const searchBar = document.querySelector('#searchbar');
  const searchInput = searchBar.querySelector('input');
  const searchClose = searchBar.querySelector("svg");

  searchInput.addEventListener("input", () => {
      if (searchInput.value) {
          searchClose.style.display = "block";
      } else {
          searchClose.style.display = "none";
      }

      // Ajouter un écouteur d'événement sur la saisie de l'utilisateur dans la barre de recherche
      filterAndDisplayRecipes();
  });

  searchClose.addEventListener("click", () => {
      searchInput.value = "";
      searchClose.style.display = "none";
  });

  // Exécuter les fonctions pour afficher les listes dans les dropdownlist lors du chargement de la page
  //displayIngredients();

  // Afficher toutes les recettes lors du chargement initial de la page
  displayRecipes(recipes);
});