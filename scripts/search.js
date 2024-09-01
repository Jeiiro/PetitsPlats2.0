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
        const tagElement = selectedTagsContainer.children[k];
        const tagName = tagElement.querySelector('.tag_name').textContent.trim();
        const tagCategory = tagElement.querySelector('.tag_name').getAttribute('data-category');
        selectedTags.push({ text: tagName, category: tagCategory });
        k++;
    }
    const filteredRecipes = [];

    let l = 0;
    // eslint-disable-next-line no-undef
    while (l < recipes.length) {
        // eslint-disable-next-line no-undef
        const recipe = recipes[l];
        const nameMatches = recipe.name.toLowerCase().includes(searchTerm);

        let ingredientsMatches = false;
        let i = 0;
        while (i < recipe.ingredients.length) {
            if (recipe.ingredients[i].ingredient.toLowerCase().includes(searchTerm)) {
                ingredientsMatches = true;
                break;
            }
            i++;
        }

        const descriptionMatches = recipe.description.toLowerCase().includes(searchTerm);

        let tagMatches = true;
        let j = 0;
        while (j < selectedTags.length) {
            const tag = selectedTags[j];
            let tagFound = false;

            if (tag.category === "ingredient") {
                let m = 0;
                while (m < recipe.ingredients.length) {
                    if (recipe.ingredients[m].ingredient.toLowerCase().includes(tag.text.toLowerCase())) {
                        tagFound = true;
                        break;
                    }
                    m++;
                }
            } else if (tag.category === "ustensil") {
                let n = 0;
                while (n < recipe.ustensils.length) {
                    if (recipe.ustensils[n].toLowerCase().includes(tag.text.toLowerCase())) {
                        tagFound = true;
                        break;
                    }
                    n++;
                }
            } else if (tag.category === "appliance") {
                if (recipe.appliance.toLowerCase().includes(tag.text.toLowerCase())) {
                    tagFound = true;
                }
            }

            if (!tagFound) {
                tagMatches = false;
                break;
            }

            j++;
        }

        // Ajout des recettes filtrées à la liste
        if ((nameMatches || ingredientsMatches || descriptionMatches) && tagMatches) {
            filteredRecipes.push(recipe);
        }

        l++;
    }
    console.log(filteredRecipes);
    // Mise à jour de l'affichage des recettes et du compteur
    updateRecipeCards(filteredRecipes, searchTerm);
    updateRecipeCount(filteredRecipes);
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