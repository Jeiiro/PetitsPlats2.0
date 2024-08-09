const clearButton = document.querySelector(".clear_button");
const input = document.querySelector(".search_contain input");

clearButton.addEventListener("click", function () {
  input.value = "";
  input.focus();
  clearButton.style.display = "none";
});

