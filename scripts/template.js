// Fonction pour générer les cartes de recettes initiales et les afficher
function generateRecipeCards() {
  const container = document.getElementById("recipes_container");
  container.innerHTML = "";
  // Parcours de chaque recette pour créer une carte
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
   // Met à jour le nombre de recettes affichées
  // eslint-disable-next-line no-undef
  updateRecipeCount();
}
// Fonction pour extraire les éléments uniques des recettes
function extractUniqueItems() {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

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
 // Retourne les éléments uniques sous forme de tableaux triés
  return {
    ingredients: Array.from(ingredientsSet).sort(),
    appliances: Array.from(appliancesSet).sort(),
    ustensils: Array.from(ustensilsSet).sort(),
  };
}
// Fonction pour capitaliser la première lettre d'une chaîne
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// Fonction pour appliquer les éléments uniques aux menus déroulants
function applyUniqueItems() {
  const { ingredients, appliances, ustensils } = extractUniqueItems();
// Récupère les conteneurs pour chaque type d'élément
  const ingredientsContainer = document.getElementById("ingredients_menu");
  const appliancesContainer = document.getElementById("appliances_menu");
  const ustensilsContainer = document.getElementById("ustensils_menu");
// Ajoute les éléments uniques à chaque menu
  addItemToMenu(ingredients, ingredientsContainer, "ingredient");
  addItemToMenu(appliances, appliancesContainer, "appliance");
  addItemToMenu(ustensils, ustensilsContainer, "ustensil");
}
// Fonction pour ajouter des éléments à un menu
function addItemToMenu(items, container, category) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.setAttribute("data-category", category);
    container.appendChild(div);
  });
}
// Fonction pour configurer le comportement des menus déroulants
function setupDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown_button");
    // Affiche ou cache le menu déroulant lors du clic sur le bouton
    button.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
    // Cache le menu déroulant si un clic est détecté en dehors de celui-ci
    window.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
    // Récupère les éléments du menu et le champ de recherche
    const searchInput = dropdown.querySelector('input[type="text"]');
    const menuItems = dropdown.querySelectorAll(".dropdown_content div");
// Filtre les éléments du menu en fonction de la saisie dans le champ de recherche
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
// Fonction pour configurer le compteur de recettes affichées
function setupRecipeCount() {
  const recipeContainer = document.getElementById("recipes_container");
  const recipeCount = recipeContainer.children.length;
  const recipeCountElement = document.querySelector(".counting_recipes");
  recipeCountElement.textContent = `${recipeCount} recettes`;
}
// Fonction pour configurer la sélection des tags
function setupTagSelection() {
  const selectedTagsContainer = document.getElementById("selected_tags");
  // Fonction pour créer un tag
  function createTag(text, category) {
    const tag = document.createElement("div");
    tag.className = "tag";
    const tagName = document.createElement("span");
    tagName.className = "tag_name";
    tagName.textContent = text;
    tagName.setAttribute("data-category", category);
// Bouton pour supprimer le tag
    const removeButton = document.createElement("span");
    removeButton.className = "remove_tag";
    removeButton.textContent = "x";
    removeButton.addEventListener("click", () => {
      selectedTagsContainer.removeChild(tag);
      // Rechercher à nouveau après la suppression du tag
      // eslint-disable-next-line no-undef
      searchRecipes();
      // Met à jour le compteur de recettes affichées
      // eslint-disable-next-line no-undef
      updateRecipeCount();
    });
    tag.appendChild(tagName);
    tag.appendChild(removeButton);

    selectedTagsContainer.appendChild(tag);
    // eslint-disable-next-line no-undef
    updateRecipeCount();
  }
  // Fonction pour gérer la sélection d'un élément dans le menu déroulant
  function handleDropdownSelection(event) {
    const selectedText = event.target.textContent.trim();
    const dataCategory = event.target.getAttribute("data-category");
    const existingTags = Array.from(selectedTagsContainer.children).map((tag) =>
      tag.textContent.replace("x", "").trim()
    );

    if (!existingTags.includes(selectedText, dataCategory)) {
      createTag(selectedText, dataCategory);
    }
  }
// Ajoute un écouteur d'événement pour chaque élément du menu déroulant
  const dropdownItems = document.querySelectorAll(".dropdown_content div");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", handleDropdownSelection);
  });
}
// Fonction exécutée lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", () => {
  // Génère et affiche les cartes de recettes
  generateRecipeCards();
  // Applique les éléments uniques aux menus déroulants
  applyUniqueItems();
  // Configure les menus déroulants
  setupDropdown();
  // Configure le compteur de recettes affichées
  setupRecipeCount();
  // Configure la sélection des tags
  setupTagSelection();
  // Lance la recherche initiale pour afficher les recettes
  // eslint-disable-next-line no-undef
  searchRecipes();
});
