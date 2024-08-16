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
  filteredRecipes.forEach((recipe) => {
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
    recipe.ingredients.forEach((ingredient) => {
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
    });
    card.appendChild(ingredientsContainer);

    const time = document.createElement("p");
    time.className = "time";
    time.textContent = `${recipe.time} min`;
    card.appendChild(time);
    container.appendChild(card);
  });
}

function searchRecipes() {
  const searchContainer = document.getElementById("search_container");

  function filterRecipes() {
    const searchTerm = searchContainer.value.toLowerCase();
    const selectedTagsContainer = document.getElementById("selected_tags");
    const selectedTags = Array.from(selectedTagsContainer.children).map((tag) =>
      tag.textContent.replace("x", "").trim()
    );
    console.log(selectedTags);
    if (searchTerm.length > 2 && selectedTags.length === 0) {
      const filteredRecipes = recipes.filter((recipe) => {
        const nameMatches = recipe.name.toLowerCase().includes(searchTerm);
        const ingredientsMatches = recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        );
        const descriptionMatches = recipe.description
          .toLowerCase()
          .includes(searchTerm);

        return nameMatches || ingredientsMatches || descriptionMatches;
      });
      console.log(filteredRecipes);
      updateRecipeCards(filteredRecipes, searchTerm);
      updateRecipeCount(filteredRecipes);
    } else if (selectedTags.length > 0 && searchTerm.length < 3) {
      const filteredRecipesTags = recipes.filter((recipe) => {
        const ingredientTagsMatches = selectedTags.every((tag) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
          )
        );
        console.log(ingredientTagsMatches);
        const ustensilsTagsMatches = selectedTags.every((tag) =>
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(tag.toLowerCase())
          )
        );
        console.log(ustensilsTagsMatches);
        const applianceTagsMatches = selectedTags.every((tag) =>
          recipe.appliance.toLowerCase().includes(tag.toLowerCase())
        );
        console.log(applianceTagsMatches);
        return (
          ingredientTagsMatches || ustensilsTagsMatches || applianceTagsMatches
        );
      });

      console.log(filteredRecipesTags);
      updateRecipeCards(filteredRecipesTags, searchTerm);
      updateRecipeCount(filteredRecipesTags);
    } else if (searchTerm.length > 2 && selectedTags.length > 0) {
      const filteredRecipesTagsAndSearch = recipes.filter((recipe) => {
        const nameMatches = recipe.name.toLowerCase().includes(searchTerm);
        const ingredientsMatches = recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchTerm)
        );
        const descriptionMatches = recipe.description
          .toLowerCase()
          .includes(searchTerm);
        const ingredientTagsMatches = selectedTags.every((tag) =>
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
          )
        );
        console.log(ingredientTagsMatches);
        const ustensilsTagsMatches = selectedTags.every((tag) =>
          recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(tag.toLowerCase())
          )
        );
        console.log(ustensilsTagsMatches);
        const applianceTagsMatches = selectedTags.every((tag) =>
          recipe.appliance.toLowerCase().includes(tag.toLowerCase())
        );
        console.log(applianceTagsMatches);
        return (
          (nameMatches || ingredientsMatches || descriptionMatches) &&
          (ingredientTagsMatches ||
            ustensilsTagsMatches ||
            applianceTagsMatches)
        );
      });
      console.log(filteredRecipesTagsAndSearch);
      updateRecipeCards(filteredRecipesTagsAndSearch, searchTerm);
      updateRecipeCount(filteredRecipesTagsAndSearch);
    } else if (searchTerm.length < 3 && selectedTags.length === 0) {
      updateRecipeCards(recipes, searchTerm);
      updateRecipeCount(recipes);
    }
  }
  searchContainer.addEventListener("input", filterRecipes);

  const dropdownItems = document.querySelectorAll(".dropdown_content div");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      filterRecipes();
    });
  });
  filterRecipes();
}
function updateRecipeCount(filteredRecipes) {
  const recipeCountElement = document.querySelector(".counting_recipes");

  if (!filteredRecipes) {
    return;
  }

  recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
}
