const clearButton = document.querySelector(".clear_button");
const input = document.querySelector(".search_contain input");
// Ajoute un gestionnaire d'événement au clic du bouton "clear"
clearButton.addEventListener("click", function () {
  input.value = "";
  input.focus();
  clearButton.style.display = "";
   // Appelle la fonction `searchRecipes` pour relancer la recherche avec un champ vide
  // eslint-disable-next-line no-undef
  searchRecipes();
  // Appelle la fonction `updateRecipeCount` pour mettre à jour le nombre de recettes affichées
  // eslint-disable-next-line no-undef
  updateRecipeCount();
});

const clearButtonDropdown = document.querySelectorAll(".clear_button_dropdown");
const inputDropdown = document.querySelectorAll(".input_search");
// Ajoute un gestionnaire d'événement au clic de chaque bouton "clear" dans les dropdowns
clearButtonDropdown.forEach((button) => {
  button.addEventListener("click", function () {
    // Pour chaque champ de saisie dans les dropdowns, réinitialise la valeur et redonne le focus
    inputDropdown.forEach((input) => {
      input.value = "";
      input.focus();
    });
    button.style.display = "";
    // Appelle la fonction `updateDropdown` pour mettre à jour les éléments du dropdown
    // eslint-disable-next-line no-undef
    updateDropdown();
  });
});
