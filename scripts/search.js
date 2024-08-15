function searchRecipes() {
  const searchContainer = document.getElementById("search_container");
  const selectedTagsContainer = document.getElementById("selected_tags");

  function getSelectedTags() {
    const selectedTags = Array.from(selectedTagsContainer.children);
    return selectedTags.reduce(
      (acc, tag) => {
        const tagText = tag.textContent.toLowerCase();
        const tagCategory = tag.dataset.category;
        if (tagCategory === "ingredient") {
          acc.ingredients.push(tagText);
        } else if (tagCategory === "ustensil") {
          acc.ustensils.push(tagText);
        } else if (tagCategory === "appliance") {
          acc.appliances.push(tagText);
        }
        return acc;
      },
      { ingredients: [], ustensils: [], appliances: [] }
    );
  }

  function filterRecipes() {
    const searchTerm = searchContainer.value.toLowerCase();
    const { ingredients, ustensils, appliances } = getSelectedTags();

    const filteredRecipes = recipes.filter((recipe) => {
      const nameMatches = recipe.name.toLowerCase().includes(searchTerm);
      const descriptionMatches = recipe.description
        .toLowerCase()
        .includes(searchTerm);

      const ingredientsMatches = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
      );

      const ingredientTagsMatch = ingredients.every((tag) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(tag)
        )
      );

      const ustensilTagsMatch = ustensils.every((tag) =>
        recipe.ustensils.includes(tag)
      );

      const applianceTagsMatch = appliances.every(
        (tag) => recipe.appliance.toLowerCase() === tag
      );

      return (
        (nameMatches || descriptionMatches || ingredientsMatches) &&
        ingredientTagsMatch &&
        ustensilTagsMatch &&
        applianceTagsMatch
      );
    });

    updateRecipeCards(filteredRecipes);
    updateRecipeCount();
  }

  searchContainer.addEventListener("input", filterRecipes);

  selectedTagsContainer.addEventListener("change", filterRecipes);

  filterRecipes();
}

function updateRecipeCards(filteredRecipes) {
  const container = document.getElementById("recipes_container");
  container.innerHTML = "";
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
