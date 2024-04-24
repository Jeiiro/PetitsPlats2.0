import { store } from "../../data/store.js";
import { recipesFilter } from "./filters/recipesFilter.js";

export function validSearch(tag) {
  let validRegExp = /^[^<>]*$/;

  return validRegExp.test(tag);
}

export function validSearchField(searchField, searchList) {
  searchField.addEventListener("input", (event) => {
    const currentSearch = event.target.value;

    currentSearch.length <= 2 || !validSearch(currentSearch)
      ? searchField.classList.add("is-invalid")
      : searchField.classList.remove("is-invalid");

    store.addSearchValue(currentSearch);

    recipesFilter();
  });
}
