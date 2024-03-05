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

// Fonction pour mettre à jour le contenu du sous-menu
function updateDropdownContent(dropdownContentId, itemsList) {
  const dropdownContent = document.getElementById(dropdownContentId);
  dropdownContent.innerHTML = '';

  // Utilisation d'une boucle for pour ajouter chaque élément de la liste au sous-menu
  for (let i = 0; i < itemsList.length; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#">${itemsList[i]}</a>`;
    dropdownContent.appendChild(listItem);
  }
}


// Fonction pour afficher les recettes
function displayRecipes(recipes) {
  const template = document.querySelector("#recipeCard");
  const container = document.querySelector("#recipes");
  container.innerHTML = ''; // Effacer le contenu actuel de la zone d'affichage des recettes
  const totalRecipes = recipes.length;

  // Modifier le contenu de l'élément indiquant le nombre total de recettes
  const totalRecipesElement = document.getElementById('totalRecipes');
  totalRecipesElement.textContent = `${totalRecipes} recettes`;

  // Récupérer la liste d'ingrédients, d'appareils et d'ustensiles
  const ingredientsList = [];
  const appliancesList = [];
  const utensilsList = [];

  // Utilisation de boucles for pour parcourir les recettes et leurs ingrédients, appareils, ustensiles
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Ingrédients
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      if (!ingredientsList.includes(ingredient)) {
        ingredientsList.push(ingredient);
      }
    }

    // Appareils
    if (!appliancesList.includes(recipe.appliance)) {
      appliancesList.push(recipe.appliance);
    }

    // Ustensiles - si vous avez plusieurs ustensiles par recette
    for (let k = 0; k < recipe.ustensils.length; k++) {
      const utensil = recipe.ustensils[k];
      if (!utensilsList.includes(utensil)) {
        utensilsList.push(utensil);
      }
    }
  }

  // Mettre à jour les menus déroulants avec les listes actuelles
  updateDropdownContent('ingredient', ingredientsList);
  updateDropdownContent('appareil', appliancesList);
  updateDropdownContent('ustensile', utensilsList);

  //console.log('Liste des ingrédients :', ingredientsList);
  //console.log('Liste des appareils :', appliancesList);
  //console.log('Liste des ustensiles :', utensilsList);

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


// Exécuter le code lorsque la page est entièrement chargée
window.addEventListener('load', () => {
  const searchBar = document.querySelector('#searchbar');
  const searchInput = searchBar.querySelector('input');
  const searchClose = searchBar.querySelector("svg");
  const svgBtn = document.querySelector(".svgBtn")
  searchInput.addEventListener("input", () => {
    searchClose.style.display = searchInput.value ? "block" : "none";
    filterAndDisplayRecipes();
  });
  searchClose.addEventListener("click", () => {
      searchInput.value = "";
      searchClose.style.display = "none";
  });

  // Afficher toutes les recettes lors du chargement initial de la page
  displayRecipes(recipes);
});