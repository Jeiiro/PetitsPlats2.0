const clearButton = document.querySelector(".clear_button");
const input = document.querySelector(".search_contain input");

clearButton.addEventListener("click", function () {
  input.value = "";
  input.focus();
  clearButton.style.display = "";
  // eslint-disable-next-line no-undef
  searchRecipes();
  // eslint-disable-next-line no-undef
  updateRecipeCount();
});

const clearButtonDropdown = document.querySelectorAll(".clear_button_dropdown");
const inputDropdown = document.querySelectorAll(".input_search");

clearButtonDropdown.forEach((button) => {
  button.addEventListener("click", function () {
    inputDropdown.forEach((input) => {
      input.value = "";
      input.focus();
    });
    button.style.display = "";
    // eslint-disable-next-line no-undef
    updateDropdown();
  });
});
