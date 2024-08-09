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
    recipe.ingredients.forEach((ing) => ingredientsSet.add(ing.ingredient));
    appliancesSet.add(recipe.appliance);
    recipe.ustensils.forEach((ust) => ustensilsSet.add(ust));
  });

  return {
    ingredients: Array.from(ingredientsSet),
    appliances: Array.from(appliancesSet),
    ustensils: Array.from(ustensilsSet),
  };
}

function applyUniqueItems() {
  const { ingredients, appliances, ustensils } = extractUniqueItems();

  const ingredientsContainer = document.getElementById("ingredients_menu");
  const appliancesContainer = document.getElementById("appliances_menu");
  const ustensilsContainer = document.getElementById("ustensils_menu");

  addItemToMenu(ingredients, ingredientsContainer);
  addItemToMenu(appliances, appliancesContainer);
  addItemToMenu(ustensils, ustensilsContainer);
}

function addItemToMenu(items, container) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
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

document.addEventListener("DOMContentLoaded", () => {
  generateRecipeCards();
  applyUniqueItems();
  setupDropdown();
});
