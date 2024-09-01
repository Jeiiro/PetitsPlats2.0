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
    const selectedTags = Array.from(selectedTagsContainer.children).map((tag) => ({ 
      text: tag.querySelector('.tag_name').textContent.trim(), 
      category: tag.querySelector('.tag_name').getAttribute('data-category') }));

    console.log(selectedTags);
    // Filtrage des recettes selon les critères de recherche et les tags sélectionnés 
    // eslint-disable-next-line no-undef
    const filteredRecipes = recipes.filter((recipe) => {
      const nameMatches = recipe.name.toLowerCase().includes(searchTerm);
      const ingredientsMatches = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchTerm)
      );
      const descriptionMatches = recipe.description
        .toLowerCase()
        .includes(searchTerm);

      // Vérification des tags sélectionnés en fonction de leur catégorie 
      const tagMatches = selectedTags.every(({ text, category }) => {
        if (category === "ingredient") { 
          return recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(text.toLowerCase())
          );
        } else if (category === "ustensil") { 
          return recipe.ustensils.some((ustensil) =>
            ustensil.toLowerCase().includes(text.toLowerCase())
          );
        } else if (category === "appliance") { 
          return recipe.appliance.toLowerCase().includes(text.toLowerCase());
        }
        return false;
      });

      // Retourner la recette si elle correspond au terme de recherche et aux tags 
      return (
        (nameMatches || ingredientsMatches || descriptionMatches) &&
        tagMatches
      );
    });
  console.log(filteredRecipes);
    // Mise à jour de l'affichage des recettes et du compteur
    updateRecipeCards(filteredRecipes, searchTerm);
    updateRecipeCount(filteredRecipes);
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
