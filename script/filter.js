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
            if (category === 'ingredients') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient === selectedFilter);
                });
            } else if (category === 'appareils') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.appliance === selectedFilter;
                });
            } else if (category === 'ustensiles') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.ustensils.includes(selectedFilter);
                });
            }
        });
        // console.log(filteredRecipes);
        let ingredients = [];
        let appareils = [];
        let ustensiles = [];

        filteredRecipes.forEach((recipe) => {
            recipe.ingredients.forEach(ingredient => {
                ingredients.push(ingredient.ingredient);
            });
            appareils.push(recipe.appliance);
            ustensiles.push(...recipe.ustensils);
        });

        ingredients = [...new Set(ingredients)].sort();
        appareils = [...new Set(appareils)].sort();
        ustensiles = [...new Set(ustensiles)].sort();

        ingredients = ingredients.filter(tag => !selectedFilter.includes(tag));
        appareils = appareils.filter(tag => !selectedFilter.includes(tag));
        ustensiles = ustensiles.filter(tag => !selectedFilter.includes(tag));


        const datafiltre = {ingredients, appareils, ustensiles};
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
                li.textContent = tag;
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

export function updateFilterTags() {
    let ingredients = [];
    let appareils = [];
    let ustensiles = [];

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient);
        });
        appareils.push(recipe.appliance);
        ustensiles.push(...recipe.ustensils);
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
            li.textContent = tag;
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
}
