// Fonction pour générer et afficher les cartes de recettes dans le conteneur
function generateRecipeCards() {
  const container = document.getElementById("recipes_container");
  container.innerHTML = "";
  // Boucle sur chaque recette pour créer sa carte respective
  // eslint-disable-next-line no-undef
  recipes.forEach((recipe) => {
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
  // Mise à jour du nombre de recettes affichées
  // eslint-disable-next-line no-undef
  updateRecipeCount();
}
// Fonction pour extraire et trier les ingrédients, appareils, et ustensiles uniques des recettes
function extractUniqueItems() {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();
// Parcours de toutes les recettes pour extraire les éléments uniques
  // eslint-disable-next-line no-undef
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ing) =>
      ingredientsSet.add(
        capitalizeFirstLetter(ing.ingredient.toLowerCase().trim())
      )
    );
    appliancesSet.add(
      capitalizeFirstLetter(recipe.appliance.toLowerCase().trim())
    );
    recipe.ustensils.forEach((ust) =>
      ustensilsSet.add(capitalizeFirstLetter(ust.toLowerCase().trim()))
    );
  });

  return {
    ingredients: Array.from(ingredientsSet).sort(),
    appliances: Array.from(appliancesSet).sort(),
    ustensils: Array.from(ustensilsSet).sort(),
  };
}
// Fonction pour capitaliser la première lettre d'une chaîne de caractères
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// Fonction pour appliquer les éléments uniques aux menus déroulants (dropdowns)
function applyUniqueItems() {
  const { ingredients, appliances, ustensils } = extractUniqueItems();
// Récupération des conteneurs des menus déroulants
  const ingredientsContainer = document.getElementById("ingredients_menu");
  const appliancesContainer = document.getElementById("appliances_menu");
  const ustensilsContainer = document.getElementById("ustensils_menu");
// Ajout des éléments dans chaque menu déroulant respectif
  addItemToMenu(ingredients, ingredientsContainer, "ingredient");
  addItemToMenu(appliances, appliancesContainer, "appliance");
  addItemToMenu(ustensils, ustensilsContainer, "ustensil");
}
// Fonction pour ajouter les éléments dans le menu déroulant spécifié
function addItemToMenu(items, container, category) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.setAttribute("data-category", category);
    container.appendChild(div);
  });
}
// Fonction pour configurer le comportement des menus déroulants (dropdowns)
function setupDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown_button");
    button.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
    // Ferme le menu déroulant si un clic est effectué en dehors

    window.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
    // Filtrage des éléments dans le menu déroulant en fonction de la recherche
    const searchInput = dropdown.querySelector('input[type="text"]');
    const menuItems = dropdown.querySelectorAll(".dropdown_content div");

    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      menuItems.forEach((item) => {
        if (item.textContent.toLowerCase().includes(filter)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}
// Fonction pour mettre à jour les éléments des menus déroulants en fonction de la recherche
// eslint-disable-next-line no-unused-vars
function updateDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const searchInput = dropdown.querySelector('input[type="text"]');
    const menuItems = dropdown.querySelectorAll(".dropdown_content div");
    const filter = searchInput.value.toLowerCase();
    menuItems.forEach((item) => {
      if (item.textContent.toLowerCase().includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}
// Fonction pour afficher le nombre de recettes
function setupRecipeCount() {
  const recipeContainer = document.getElementById("recipes_container");
  const recipeCount = recipeContainer.children.length;
  const recipeCountElement = document.querySelector(".counting_recipes");
  recipeCountElement.textContent = `${recipeCount} recettes`;
}
// Fonction pour configurer la sélection de tags
function setupTagSelection() {
  const selectedTagsContainer = document.getElementById("selected_tags");
  // Fonction pour créer un nouveau tag
  function createTag(text) {
    const tag = document.createElement("div");
    tag.className = "tag";
    const tagName = document.createElement("span");
    tagName.className = "tag_name";
    tagName.textContent = text;
 // Bouton pour supprimer le tag
    const removeButton = document.createElement("span");
    removeButton.className = "remove_tag";
    removeButton.textContent = "x";
    removeButton.addEventListener("click", () => {
      selectedTagsContainer.removeChild(tag);
      // eslint-disable-next-line no-undef
      searchRecipes();
      // eslint-disable-next-line no-undef
      updateRecipeCount();
    });
    tag.appendChild(tagName);
    tag.appendChild(removeButton);

    selectedTagsContainer.appendChild(tag);
    // eslint-disable-next-line no-undef
    updateRecipeCount();
  }
  // Gestion de la sélection dans les menus déroulants
  function handleDropdownSelection(event) {
    const selectedText = event.target.textContent.trim();
    const existingTags = Array.from(selectedTagsContainer.children).map((tag) =>
      tag.textContent.replace("x", "").trim()
    );
// Création du tag si celui-ci n'est pas déjà sélectionné
    if (!existingTags.includes(selectedText)) {
      createTag(selectedText);
    }
  }
// Ajout de l'écouteur d'événement pour la sélection d'un item dans le menu déroulant
  const dropdownItems = document.querySelectorAll(".dropdown_content div");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", handleDropdownSelection);
  });
}
// Initialisation des fonctions une fois le DOM chargé
document.addEventListener("DOMContentLoaded", () => {
  // Génère les cartes de recettes au chargement
  generateRecipeCards();
  // Applique les ingrédients, ustensiles, et appareils uniques aux menus déroulants
  applyUniqueItems();
  // Configure les comportements des menus déroulants
  setupDropdown();
  // Affiche le nombre de recettes
  setupRecipeCount();
  // Configure la sélection de tags
  setupTagSelection();
  // Initialise la recherche des recettes
  // eslint-disable-next-line no-undef
  searchRecipes();
});
