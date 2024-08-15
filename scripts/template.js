function generateRecipeCards() {
  const container = document.getElementById("recipes_container");
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
}
function extractUniqueItems() {
  const ingredientsSet = new Set();
  const appliancesSet = new Set();
  const ustensilsSet = new Set();

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
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function applyUniqueItems() {
  const { ingredients, appliances, ustensils } = extractUniqueItems();

  const ingredientsContainer = document.getElementById("ingredients_menu");
  const appliancesContainer = document.getElementById("appliances_menu");
  const ustensilsContainer = document.getElementById("ustensils_menu");

  addItemToMenu(ingredients, ingredientsContainer, "ingredient");
  addItemToMenu(appliances, appliancesContainer, "appliance");
  addItemToMenu(ustensils, ustensilsContainer, "ustensil");
}

function addItemToMenu(items, container, category) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    div.setAttribute("data-category", category);
    container.appendChild(div);
  });
}

function setupDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropdown_button");
    button.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
    window.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("active");
      }
    });
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
function updateRecipeCount() {
  const recipeContainer = document.getElementById("recipes_container");
  const recipeCount = recipeContainer.children.length;
  const recipeCountElement = document.querySelector(".counting_recipes");
  recipeCountElement.textContent = `${recipeCount} recettes`;
}
function setupTagSelection() {
  const selectedTagsContainer = document.getElementById("selected_tags");
  function createTag(text) {
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = text;

    const removeButton = document.createElement("span");
    removeButton.className = "remove_tag";
    removeButton.textContent = "x";
    removeButton.addEventListener("click", () => {
      selectedTagsContainer.removeChild(tag);
      updateRecipeCount();
    });

    tag.appendChild(removeButton);
    selectedTagsContainer.appendChild(tag);
    updateRecipeCount();
  }
  function handleDropdownSelection(event) {
    const selectedText = event.target.textContent.trim();
    const existingTags = Array.from(selectedTagsContainer.children).map((tag) =>
      tag.textContent.replace("x", "").trim()
    );

    if (!existingTags.includes(selectedText)) {
      createTag(selectedText);
    }
  }

  const dropdownItems = document.querySelectorAll(".dropdown_content div");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", handleDropdownSelection);
  });
}
function updateRecipeDisplay() {
  const selectedTagsContainer = document.getElementById("selectedTags");
  const selectedTags = Array.from(selectedTagsContainer.children).map((tag) =>
    tag.textContent.replace("x", "").trim().toLowerCase()
  );

  const recipes = document.querySelectorAll(".recipe_card");

  recipes.forEach((recipe) => {
    const ingredients = Array.from(
      recipe.querySelectorAll(".ingredients .ingredient_title")
    ).map((ing) => ing.textContent.trim().toLowerCase());

    const appliances = recipe
      .querySelector(".appliance")
      ?.textContent.trim()
      .toLowerCase();

    const ustensils = Array.from(recipe.querySelectorAll(".ustensils div")).map(
      (ust) => ust.textContent.trim().toLowerCase()
    );

    const matches = selectedTags.every(
      (tag) =>
        ingredients.includes(tag) ||
        (appliances && appliances.includes(tag)) ||
        ustensils.includes(tag)
    );

    if (matches || selectedTags.length === 0) {
      recipe.style.display = "";
    } else {
      recipe.style.display = "none";
    }
  });

  updateRecipeCount();
}

document.addEventListener("DOMContentLoaded", () => {
  generateRecipeCards();
  applyUniqueItems();
  setupDropdown();
  updateRecipeCount();
  setupTagSelection();
});
