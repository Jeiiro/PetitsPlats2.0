// Fonction pour mettre à jour les cartes de recettes affichées en fonction des recettes filtrées
function updateRecipeCards(filteredRecipes, searchTerm) {
  const container = document.getElementById("recipes_container");
  container.innerHTML = "";
   // Affiche un message d'erreur si aucune recette n'est trouvée
  if (filteredRecipes.length === 0) {
    const message = document.createElement("p");
    message.className = "error_message";
    message.textContent = `Aucune recette ne contient ''${searchTerm}'' vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
    container.appendChild(message);
    return;
  }
  // Crée et affiche une carte pour chaque recette filtrée
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
// Fonction pour rechercher et filtrer les recettes en fonction des termes de recherche et des tags sélectionnés
// eslint-disable-next-line no-unused-vars
function searchRecipes() {
  const searchContainer = document.getElementById("search_container");
// Fonction pour filtrer les recettes selon les critères de recherche et les tags sélectionnés
  function filterRecipes() {
    const searchTerm = searchContainer.value.toLowerCase();
    const selectedTagsContainer = document.getElementById("selected_tags");
    const selectedTags = Array.from(selectedTagsContainer.children).map((tag) =>
      tag.textContent.replace("x", "").trim()
    );
    console.log(selectedTags);
    // Filtrage des recettes lorsque le terme de recherche a plus de 2 caractères et aucun tag n'est sélectionné
    if (searchTerm.length > 2 && selectedTags.length === 0) {
      // eslint-disable-next-line no-undef
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
      // Filtrage des recettes selon les tags sélectionnés lorsque le terme de recherche est trop court
    } else if (selectedTags.length > 0 && searchTerm.length < 3) {
      // eslint-disable-next-line no-undef
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
      // Filtrage des recettes selon les tags sélectionnés et le terme de recherche
    } else if (searchTerm.length > 2 && selectedTags.length > 0) {
      // eslint-disable-next-line no-undef
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
        // Retourne les recettes qui correspondent à la fois au terme de recherche et aux tags
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
      // Affiche toutes les recettes lorsque le terme de recherche est trop court et aucun tag n'est sélectionné
    } else if (searchTerm.length < 3 && selectedTags.length === 0) {
      // eslint-disable-next-line no-undef
      updateRecipeCards(recipes, searchTerm);
      // eslint-disable-next-line no-undef
      updateRecipeCount(recipes);
    }
  }
  // Ajoute un écouteur d'événement sur le champ de recherche pour filtrer les recettes lors de la saisie
  searchContainer.addEventListener("input", filterRecipes);
// Ajoute un écouteur d'événement sur les éléments du menu déroulant pour filtrer les recettes lors d'une sélection
  const dropdownItems = document.querySelectorAll(".dropdown_content div");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      filterRecipes();
    });
  });
  // Appelle la fonction de filtrage pour afficher les recettes initiales
  filterRecipes();
}
// Fonction pour mettre à jour le compteur de recettes affichées
function updateRecipeCount(filteredRecipes) {
  const recipeCountElement = document.querySelector(".counting_recipes");

  if (!filteredRecipes) {
    return;
  }
// Met à jour le texte du compteur de recettes avec le nombre de recettes filtrées
  recipeCountElement.textContent = `${filteredRecipes.length} recettes`;
}
