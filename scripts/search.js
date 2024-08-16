function updateRecipeCards(filteredRecipes, searchTerm) {
    const container = document.getElementById("recipes_container");
    container.innerHTML = "";
    
    if (filteredRecipes.length === 0) {
      const message = document.createElement("p");
      message.className = "error_message";
      message.textContent = `Aucune recette ne contient ''${searchTerm}'' vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
      container.appendChild(message);
      return;
    }
  
    let i = 0;
    while (i < filteredRecipes.length) {
      const recipe = filteredRecipes[i];
      const card = document.createElement("div");
      card.className = "recipe_card";
  
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
  
      const time = document.createElement("p");
      time.className = "time";
      time.textContent = `${recipe.time} min`;
      card.appendChild(time);
      container.appendChild(card);
      i++;
    }
  }
  
  function searchRecipes() {
    const searchContainer = document.getElementById("search_container");
  
    function filterRecipes() {
      const searchTerm = searchContainer.value.toLowerCase();
      const selectedTagsContainer = document.getElementById("selected_tags");
      const selectedTags = [];
      
      let k = 0;
      while (k < selectedTagsContainer.children.length) {
        selectedTags.push(
          selectedTagsContainer.children[k].textContent.replace("x", "").trim()
        );
        k++;
      }
  
      if (searchTerm.length > 2 && selectedTags.length === 0) {
        const filteredRecipes = [];
        
        let l = 0;
        while (l < recipes.length) {
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
      } else if (selectedTags.length > 0 && searchTerm.length < 3) {
        const filteredRecipesTags = [];
  
        let m = 0;
        while (m < recipes.length) {
          const recipe = recipes[m];
          let ingredientTagsMatches = true;
          let n = 0;
          while (n < selectedTags.length) {
            const tag = selectedTags[n];
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
      } else if (searchTerm.length > 2 && selectedTags.length > 0) {
        const filteredRecipesTagsAndSearch = [];
  
        let o = 0;
        while (o < recipes.length) {
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
      } else if (searchTerm.length < 3 && selectedTags.length === 0) {
        updateRecipeCards(recipes, searchTerm);
        updateRecipeCount(recipes);
      }
    }
  
    searchContainer.addEventListener("input", filterRecipes);
  
    const dropdownItems = document.querySelectorAll(".dropdown_content div");
    let q = 0;
    while (q < dropdownItems.length) {
      dropdownItems[q].addEventListener("click", () => {
        filterRecipes();
      });
      q++;
    }
  
    filterRecipes();
  }
  
  function updateRecipeCount(filteredRecipes) {
    const recipeCountElement = document.querySelector(".counting_recipes");
  
    if (!filteredRecipes) {
      return;
    }
  
    recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
  }