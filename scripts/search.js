// Fonction pour mettre à jour l'affichage des cartes de recettes en fonction des résultats filtrés
function updateRecipeCards(filteredRecipes, searchTerm) {
    const container = document.getElementById("recipes_container");
    container.innerHTML = "";
    
    if (filteredRecipes.length === 0) {
      // Affiche un message si aucune recette n'est trouvée
      const message = document.createElement("p");
      message.className = "error_message";
      message.textContent = `Aucune recette ne contient ''${searchTerm}'' vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
      container.appendChild(message);
      return;
    }
  // Parcourt et crée les cartes pour chaque recette filtrée
    let i = 0;
    while (i < filteredRecipes.length) {
      const recipe = filteredRecipes[i];
      const card = document.createElement("div");
      card.className = "recipe_card";
  // Ajoute l'image, le titre, la description et les ingrédients à la carte
      const image = document.createElement("img");
      image.src = recipe.image;
      image.alt = recipe.name;
      card.appendChild(image);
  
      const title = document.createElement("h2");
      title.textContent = recipe.name;
      card.appendChild(title);
  
      const recipeTitle = document.createElement("h3");
      recipeTitle.textContent = "RECETTE";
      card.appendChild(recipeTitle);
  
      const description = document.createElement("p");
      description.className = "description";
      description.textContent = recipe.description;
      card.appendChild(description);
  
      const ingredientsTitle = document.createElement("h3");
      ingredientsTitle.textContent = "INGRÉDIENTS";
      card.appendChild(ingredientsTitle);
  
      const ingredientsContainer = document.createElement("div");
      ingredientsContainer.className = "ingredients";
   // Ajoute les ingrédients à la carte
      let j = 0;
      while (j < recipe.ingredients.length) {
        const ingredient = recipe.ingredients[j];
        const ingredientDiv = document.createElement("div");
        const ingredientName = document.createElement("p");
        ingredientName.textContent = ingredient.ingredient;
        ingredientDiv.setAttribute("class", "ingredient_title");
        ingredientDiv.appendChild(ingredientName);
  
        const ingredientQuantity = document.createElement("p");
        ingredientQuantity.textContent = `${ingredient.quantity || ""} ${
          ingredient.unit || ""
        }`;
        ingredientDiv.appendChild(ingredientQuantity);
  
        ingredientsContainer.appendChild(ingredientDiv);
        j++;
      }
      card.appendChild(ingredientsContainer);
  // Ajoute le temps de préparation à la carte
      const time = document.createElement("p");
      time.className = "time";
      time.textContent = `${recipe.time} min`;
      card.appendChild(time);
      // Ajoute la carte complète au conteneur principal
      container.appendChild(card);
      i++;
    }
  }
  // Fonction pour filtrer les recettes en fonction des termes de recherche et des tags sélectionnés
  // eslint-disable-next-line no-unused-vars
  function searchRecipes() {
    const searchContainer = document.getElementById("search_container");
  
    function filterRecipes() {
      const searchTerm = searchContainer.value.toLowerCase();
      const selectedTagsContainer = document.getElementById("selected_tags");
      const selectedTags = [];
      // Récupère les tags sélectionnés
      let k = 0;
      while (k < selectedTagsContainer.children.length) {
        selectedTags.push(
          selectedTagsContainer.children[k].textContent.replace("x", "").trim()
        );
        k++;
      }
  // Filtrage des recettes en fonction du terme de recherche
      if (searchTerm.length > 2 && selectedTags.length === 0) {
        const filteredRecipes = [];
        
        let l = 0;
        // eslint-disable-next-line no-undef
        while (l < recipes.length) {
          // eslint-disable-next-line no-undef
          const recipe = recipes[l];
          const nameMatches = recipe.name.toLowerCase().includes(searchTerm);
          const ingredientsMatches = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchTerm)
          );
          const descriptionMatches = recipe.description
            .toLowerCase()
            .includes(searchTerm);
  
          if (nameMatches || ingredientsMatches || descriptionMatches) {
            filteredRecipes.push(recipe);
          }
          l++;
        }
        updateRecipeCards(filteredRecipes, searchTerm);
        updateRecipeCount(filteredRecipes);
        // Filtrage des recettes en fonction des tags sélectionnés
      } 
      else if (selectedTags.length > 0 && searchTerm.length < 3) {
        const filteredRecipesTags = [];
  
        let m = 0;
        // eslint-disable-next-line no-undef
        while (m < recipes.length) {
          // eslint-disable-next-line no-undef
          const recipe = recipes[m];
          // Vérifie si tous les tags sont présents dans les ingrédients, ustensiles, ou appareils
          let ingredientTagsMatches = true;
          let n = 0;
          while (n < selectedTags.length) {
            const tag = selectedTags[n];
            // Ajoute la recette filtrée si elle correspond aux tags
            if (
              !recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
              )
            ) {
              ingredientTagsMatches = false;
              break;
            }
            n++;
          }
  
          let ustensilsTagsMatches = true;
          n = 0;
          while (n < selectedTags.length) {
            const tag = selectedTags[n];
            if (
              !recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(tag.toLowerCase())
              )
            ) {
              ustensilsTagsMatches = false;
              break;
            }
            n++;
          }
  
          let applianceTagsMatches = true;
          n = 0;
          while (n < selectedTags.length) {
            const tag = selectedTags[n];
            if (!recipe.appliance.toLowerCase().includes(tag.toLowerCase())) {
              applianceTagsMatches = false;
              break;
            }
            n++;
          }
  
          if (
            ingredientTagsMatches ||
            ustensilsTagsMatches ||
            applianceTagsMatches
          ) {
            filteredRecipesTags.push(recipe);
          }
          m++;
        }
  
        updateRecipeCards(filteredRecipesTags, searchTerm);
        updateRecipeCount(filteredRecipesTags);
        // Filtrage par terme de recherche et par tags
      } else if (searchTerm.length > 2 && selectedTags.length > 0) {
        const filteredRecipesTagsAndSearch = [];
  
        let o = 0;
        // eslint-disable-next-line no-undef
        while (o < recipes.length) {
          // eslint-disable-next-line no-undef
          const recipe = recipes[o];
          const nameMatches = recipe.name.toLowerCase().includes(searchTerm);
          const ingredientsMatches = recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(searchTerm)
          );
          const descriptionMatches = recipe.description
            .toLowerCase()
            .includes(searchTerm);
  
          let ingredientTagsMatches = true;
          let p = 0;
          while (p < selectedTags.length) {
            const tag = selectedTags[p];
            if (
              !recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
              )
            ) {
              ingredientTagsMatches = false;
              break;
            }
            p++;
          }
  
          let ustensilsTagsMatches = true;
          p = 0;
          while (p < selectedTags.length) {
            const tag = selectedTags[p];
            if (
              !recipe.ustensils.some((ustensil) =>
                ustensil.toLowerCase().includes(tag.toLowerCase())
              )
            ) {
              ustensilsTagsMatches = false;
              break;
            }
            p++;
          }
  
          let applianceTagsMatches = true;
          p = 0;
          while (p < selectedTags.length) {
            const tag = selectedTags[p];
            if (!recipe.appliance.toLowerCase().includes(tag.toLowerCase())) {
              applianceTagsMatches = false;
              break;
            }
            p++;
          }
  
          if (
            (nameMatches || ingredientsMatches || descriptionMatches) &&
            (ingredientTagsMatches || ustensilsTagsMatches || applianceTagsMatches)
          ) {
            filteredRecipesTagsAndSearch.push(recipe);
          }
          o++;
        }
  
        updateRecipeCards(filteredRecipesTagsAndSearch, searchTerm);
        updateRecipeCount(filteredRecipesTagsAndSearch);
        // Affiche toutes les recettes si aucun terme de recherche ou tag n'est sélectionné
      } else if (searchTerm.length < 3 && selectedTags.length === 0) {
        // eslint-disable-next-line no-undef
        updateRecipeCards(recipes, searchTerm);
        // eslint-disable-next-line no-undef
        updateRecipeCount(recipes);
      }
    }
  // Déclenche la recherche lors de la saisie ou la sélection d'un tag
    searchContainer.addEventListener("input", filterRecipes);
  
    const dropdownItems = document.querySelectorAll(".dropdown_content div");
    let q = 0;
    while (q < dropdownItems.length) {
      dropdownItems[q].addEventListener("click", () => {
        filterRecipes();
      });
      q++;
    }
  // Effectue une première recherche au chargement
    filterRecipes();
  }
  // Fonction pour mettre à jour le compteur de recettes affichées
  function updateRecipeCount(filteredRecipes) {
    const recipeCountElement = document.querySelector(".counting_recipes");
  
    if (!filteredRecipes) {
      return;
    }
   // Affiche le nombre de recettes trouvées
    recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
  }