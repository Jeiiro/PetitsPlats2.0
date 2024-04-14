import {recipes} from "../data/recipes.js";
import {displayCards} from "./card.js";


function attachClickListener(li, ul, selectedUl, category, data) {
    if (li.listenerAttached) {
        return;
    }

    li.listenerAttached = true;

    

    function filterRecipesByTags(data, category, selectedFilter) {
        let filteredRecipes = recipes;
        console.log(selectedFilter);
        selectedFilter.forEach(selectedFilter => {
            // Normalize the filter text
            let normalizedFilter = selectedFilter.toLowerCase().trim();
            normalizedFilter = normalizedFilter.charAt(0).toUpperCase() + normalizedFilter.slice(1);

            if (category === 'ingredients') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient === normalizedFilter);
                });
            } else if (category === 'appareils') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.appliance === normalizedFilter;
                });
            } else if (category === 'ustensiles') {
                // toLowerCase() to make the search case-insensitive
                let normalizedFilter = selectedFilter.toLowerCase().trim();
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === normalizedFilter);
                });
            }
        });
        console.log(filteredRecipes);
        let ingredients = [];
        let appareils = [];
        let ustensiles = [];

        filteredRecipes.forEach((recipe) => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.push(capitaliseFirstLetter(ingredient.ingredient));
            });
            appareils.push(capitaliseFirstLetter(recipe.appliance));
            ustensiles.push(...recipe.ustensils.map(ustensil => capitaliseFirstLetter(ustensil)));
        });

        ingredients = [...new Set(ingredients)].sort();
        appareils = [...new Set(appareils)].sort();
        ustensiles = [...new Set(ustensiles)].sort();

        ingredients = ingredients.filter(tag => !selectedFilter.includes(tag));
        appareils = appareils.filter(tag => !selectedFilter.includes(tag));
        ustensiles = ustensiles.filter(tag => !selectedFilter.includes(tag));


        const datafiltre = {
            ingredients:[...new Set(ingredients)].sort(),
            appareils: [...new Set(appareils)].sort(),
            ustensiles: [...new Set(ustensiles)].sort()
        };
        const categories = ['ingredients', 'appareils', 'ustensiles'];
        categories.forEach(category => {
            const ul = document.querySelector(`.filter_tags_${category}`);
            const selectedUl = document.querySelector(`.selected_filter_tags_${category}`);
            ul.innerHTML = ''; // Clear the ul
            datafiltre[category].forEach(tag => {
                const li = document.createElement('li');
                li.textContent = tag;
                li.classList.add('tag');
                ul.appendChild(li);
                attachClickListener(li, ul, selectedUl, category, datafiltre);
            });
        });

        displayCards(filteredRecipes);
        return filteredRecipes;
    }

    li.addEventListener('click', (event) => {
        if (event.target.classList.contains('selected')) {
            // Remove 'selected' class from the clicked li
            event.target.classList.remove('selected');
            // Remove the li from the permanent list
            const permanentUl = document.querySelector(`.permanent_filter_tags_${category}`);
            const permanentLi = [...permanentUl.children].find(child => child.textContent === event.target.textContent);
            if (permanentLi) {
                permanentLi.remove();
            }
            const selectedLi = [...selectedUl.children].find(child => child.textContent === event.target.textContent);
            if (selectedLi) {
                selectedLi.remove();
            }

            // Find the correct index to insert the li element
            const index = [...ul.children].findIndex(child => child.textContent.localeCompare(event.target.textContent) > 0);
            if (index === -1) {
                // If no such index is found, append the li at the end
                ul.appendChild(event.target);
            } else {
                // Otherwise, insert the li before the element at the found index
                ul.insertBefore(event.target, ul.children[index]);
            }

            // Re-attach the click listener
            attachClickListener(event.target, ul, selectedUl, category, data);
            //update the filtered recipes
            const selectedFilter = [...selectedUl.children].map(li => li.textContent);
            filterRecipesByTags(data, category, selectedFilter);
        } else {
            // Add 'selected' class to the clicked li
            event.target.classList.add('selected');

            let selectedLi = event.target.cloneNode(true);
            let crossImg = document.createElement('img');
            crossImg.src = './assets/utils/cross.svg';
            crossImg.classList.add('cross_selected');
            selectedUl.appendChild(selectedLi);
            selectedLi.appendChild(crossImg);

            let permanentLi = event.target.cloneNode(true);
            let crossTagImg = document.createElement('img');
            crossTagImg.src = './assets/utils/cross_tag.svg';
            crossTagImg.classList.add('cross_tag');
            const permanentUl = document.querySelector(`.permanent_filter_tags_${category}`);

            // Check if a li with the same content already exists in permanentLi
            const existingLi = [...permanentUl.children].find(child => child.textContent === permanentLi.textContent);
            if (!existingLi) {
                // If no such li exists, add the new li to permanentLi
                permanentUl.appendChild(permanentLi);
                permanentLi.appendChild(crossTagImg);
            }
            permanentLi.addEventListener('click', () => {
                permanentLi.remove();
                selectedLi.remove();
                li.click();
            });
            selectedLi.addEventListener('click', () => {
                selectedLi.remove();
                // Trigger the click event on the original li to move it back to the original list
                li.click();
            });

            // Remove the li from the original list
            event.target.remove();

            const selectedFilter = [...selectedUl.children].map(li => li.textContent);
            const filteredRecipes = filterRecipesByTags(data, category, selectedFilter);

            ul.innerHTML = ''; // Clear the ul
            let tags = [];
            filteredRecipes.forEach(recipe => {
                if (category === 'appareils') {
                    tags.push(recipe.appliance);
                }
                if (category === 'ustensiles') {
                    tags.push(...recipe.ustensils);
                }
                if (category === 'ingredients') {
                    recipe.ingredients.forEach(ingredient => {
                        tags.push(ingredient.ingredient);
                    });
                }
            });

            // Remove duplicates and sort alphabetically
            tags = [...new Set(tags)].sort();

            // Exclude the selected tags
            tags = tags.filter(tag => !selectedFilter.includes(tag));


            tags.forEach(tag => {
                const li = document.createElement('li');
                li.textContent = capitaliseFirstLetter(tag);
                li.classList.add('tag');
                ul.appendChild(li);
                attachClickListener(li, ul, selectedUl, category, data);
            });

            displayCards(filteredRecipes);
        }
    });


    const permanentFilterTags = ['appareils', 'ingredients', 'ustensiles'];
    permanentFilterTags.forEach(filterTag => {
        const permanentFilterTagUl = document.querySelector(`.permanent_filter_tags_${filterTag}`);
        permanentFilterTagUl.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const permanentUl = document.querySelector(`.permanent_filter_tags_${category}`);
                const permanentLi = [...permanentUl.children].find(child => child.textContent === event.target.textContent);
                if (permanentLi) {
                    permanentLi.click();
                }
            }
        });
    });
}
document.addEventListener('click', function(event) {
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    filterDropdowns.forEach((dropdown) => {
        const isClickInside = dropdown.contains(event.target);
        const isFilterButton = event.target.classList.contains('filter-button');
        const isFilterElement = event.target.classList.contains('tag'); // Check if the clicked element is a filter element
        if (!isClickInside && !isFilterButton && !isFilterElement && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
            const button = dropdown.previousElementSibling;
            button.style.borderRadius = '11px';
            const arrowImg = button.parentElement.querySelector('img');
            arrowImg.setAttribute("src", "./assets/utils/ArrowDown.svg");
        }
    });
});

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function updateFilterTags() {
    let ingredients = [];
    let appareils = [];
    let ustensiles = [];

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient => {
            let normalizedIngredient = ingredient.ingredient.toLowerCase().trim();
            normalizedIngredient = normalizedIngredient.charAt(0).toUpperCase() + normalizedIngredient.slice(1);
            // Remove trailing 's' to handle plurals
            if (normalizedIngredient.endsWith('s')) {
                normalizedIngredient = normalizedIngredient.slice(0, -1);
            }
            ingredients.push(normalizedIngredient);
        });
        let normalizedAppliance = recipe.appliance.toLowerCase().trim();
        normalizedAppliance = normalizedAppliance.charAt(0).toUpperCase() + normalizedAppliance.slice(1);
        appareils.push(normalizedAppliance);
        let normalizedUstensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase().trim());
        normalizedUstensils = normalizedUstensils.map(ustensil => capitaliseFirstLetter(ustensil));
        ustensiles.push(...normalizedUstensils);
    });

    ingredients = [...new Set(ingredients)].sort();
    appareils = [...new Set(appareils)].sort();
    ustensiles = [...new Set(ustensiles)].sort();

    const categories = ['ingredients', 'appareils', 'ustensiles'];
    const data = {ingredients, appareils, ustensiles};

    categories.forEach(category => {
        const ul = document.querySelector(`.filter_tags_${category}`);
        const selectedUl = document.querySelector(`.selected_filter_tags_${category}`);
        ul.innerHTML = ''; // Clear the ul

        data[category].forEach(tag => {
            const li = document.createElement('li');
            li.textContent =  capitaliseFirstLetter(tag);
            li.classList.add('tag');
            ul.appendChild(li);

            attachClickListener(li, ul, selectedUl, category, data);
        });

    });

}

export function handleFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    //si on clique sur un bouton, on affiche le dropdown correspondant
    filterButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const dropdown = event.target.nextElementSibling;
                dropdown.classList.toggle('hidden');
                const arrowImg = event.target.parentElement.querySelector('img');
                if (!dropdown.classList.contains('hidden')) {
                    button.style.borderRadius = '11px 11px 0 0';
                    dropdown.style.zIndex = '1';
                    //change src of the arrow to up
                    arrowImg.setAttribute('src', './assets/utils/ArrowUp.svg');
                } else {
                    button.style.borderRadius = '11px';
                    dropdown.style.zIndex = '-1';
                    //change src
                    arrowImg.setAttribute("src", "./assets/utils/ArrowDown.svg");
                }
            });
        }
    );
    const filterSearchInput = document.querySelectorAll('.filter-search');
    filterSearchInput.forEach((input) => {
            input.addEventListener('input', (event) => {
                // Get the parent container of the input field
                const parentContainer = event.target.parentElement;
// Get the category of the filter
                const category = 'ingredients' || 'appareils' || 'ustensiles';
                // Get all the tag elements within this parent container
                const filterTags = parentContainer.querySelectorAll('.tag');
                const filterTagsArray = Array.from(filterTags);
                const filterTagsText = filterTagsArray.map(tag => tag.textContent);
                const filterResults = filterTagsText.filter(tag => tag.toLowerCase().includes(event.target.value.toLowerCase()));

                const selectedUl = document.querySelector(`.selected_filter_tags_${category}`);
                const selectedTags = Array.from(selectedUl.children).map(li => li.textContent);
                filterTagsArray.forEach(tag => {
                    // If the tag is selected, always display it
                    if (selectedTags.includes(tag.textContent)) {
                        tag.style.display = 'block';
                    } else if (filterResults.includes(tag.textContent)) {
                        // If the tag is not selected but matches the search, display it
                        tag.style.display = 'block';
                    } else {
                        // If the tag is not selected and does not match the search, hide it
                        tag.style.display = 'none';
                    }
                });
            });
        }
    );

}
