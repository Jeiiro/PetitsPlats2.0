import {recipes} from "../data/recipes.js";
import {displayCards} from "./card.js";

// Fonction pour ajouter un tag sélectionné à la section des tags
function addSelectedTagToSection(tagText, category) {
    const tagSection = document.querySelector(`.tag_${category}`);
    const tagElement = document.createElement('div');
    tagElement.textContent = tagText;
    tagElement.classList.add('tag', 'selected');

    const cross = document.createElement('img');
    cross.src = '../assets/utils/cross_tag.svg';
    cross.alt = 'cross';
    cross.classList.add('cross_tag');

    // Supprimer le tag lorsqu'on clique sur la croix
    cross.addEventListener('click', () => {
        // Désélectionner le tag dans le filtre
        const filterTag = document.querySelector(`.filter_tags_${category} .tag.selected`);
        tagElement.remove();
        if (filterTag && filterTag.textContent.trim() === tagText) {
            filterTag.classList.remove('selected');
            const crossInFilter = filterTag.querySelector('.cross');
            if (crossInFilter)
                crossInFilter.remove();
        } else {
            console.log('filter_tags_', category);
            console.log(tagText);
            console.log(tagSection);


        }
        // Mettre à jour les recettes et les tags de filtre
        const filteredRecipes = filterRecipesByTags();
        updateFilterTags(filteredRecipes);
        displayCards(filteredRecipes);

    });

    tagElement.appendChild(cross);
    tagSection.appendChild(tagElement);
}

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
export function filterRecipesByTags() {
    const selectedTags = Array.from(document.querySelectorAll('.selected')).map(tag => tag.textContent.trim().toLowerCase());
    // Ensure that this function returns an array
    return recipes.filter(recipe => {
        const recipeTags = [
            ...recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()),
            recipe.appliance.toLowerCase(),
            ...recipe.ustensils.map(ustensils => ustensils.toLowerCase())
        ];
        return selectedTags.every(tag => recipeTags.includes(tag));
    });
}

// Fonction pour mettre à jour les tags de filtre
export function updateFilterTags(filteredRecipes) {
    // Get all ingredients, ustensils, and appareils from the filtered recipes
    const ingredients = filteredRecipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const ustensiles = filteredRecipes.map(recipe => recipe.ustensils);
    const appareils = filteredRecipes.map(recipe => recipe.appliance);


    const allIngredients = [...new Set([].concat(...ingredients))].sort();
    const allUstensiles = [...new Set([].concat(...ustensiles))].sort();
    const allAppareils = [...new Set(appareils)].sort();

    // Add the sorted tags to the appropriate containers
    addTagsToContainer(allIngredients, 'ingrédients');
    addTagsToContainer(allUstensiles, 'ustensiles');
    addTagsToContainer(allAppareils, 'appareils');
}


// Fonction pour ajouter les tags aux conteneurs appropriés
function addTagsToContainer(tags, category) {
    const container = document.querySelector(`.filter_tags_${category}`);
    if (container) {
        // Get selected tags
        const selectedTags = Array.from(document.querySelectorAll('.selected')).map(tag => tag.textContent.trim());

        // Sort tags: selected tags first, then the rest
        tags.sort((a, b) => {
            if (selectedTags.includes(a) && !selectedTags.includes(b)) {
                return -1;
            } else if (!selectedTags.includes(a) && selectedTags.includes(b)) {
                return 1;
            } else {
                return a.localeCompare(b);
            }
        });

        tags.forEach(tag => {
            // Only add the tag if it is not already in the container
            if (!Array.from(container.children).some(li => li.textContent.trim() === tag)) {
                const li = document.createElement('li');

                li.textContent = tag;
                li.classList.add('tag');
                // Add cross.svg to selected tags
                if (selectedTags.includes(tag)) {
                    li.innerHTML += ' <img src="../assets/utils/cross.svg" alt="cross" class="cross">';
                }
                container.prepend(li); // Change this line
            }
        });
    }
}

// Fonction pour gérer les filtres
export function handleFilters() {
    document.querySelectorAll('.filter-container').forEach(filterContainer => {
        const filterButton = filterContainer.querySelector('.filter-button');
        const filterDropdown = filterContainer.querySelector('.filter-dropdown');
        const filterSearch = filterContainer.querySelector('.filter-search');
        const filterTags = filterContainer.querySelector('.filter-tags');
        const arrow = filterContainer.querySelector('img');

        // Toggle the visibility of the dropdown when the filter button is clicked
        filterButton.addEventListener('click', () => {
            filterDropdown.classList.toggle('hidden');
            if (filterDropdown.classList.contains('hidden')) {
                arrow.src = './assets/utils/ArrowDown.svg';
                filterButton.style.borderRadius = '11px';
                filterDropdown.style.zIndex = '0';
            } else {
                arrow.src = './assets/utils/ArrowUp.svg';
                filterButton.style.borderRadius = '11px 11px 0 0';
                filterDropdown.style.zIndex = '1';
            }
        });

        // Close the dropdown when clicking outside of the filter container
        document.addEventListener('click', (event) => {
            if (!filterContainer.contains(event.target)) {
                filterDropdown.classList.add('hidden');
                arrow.src = './assets/utils/ArrowDown.svg';
                filterButton.style.borderRadius = '11px';
                filterDropdown.style.zIndex = '0';
            }
        });

        // Filter the tags when the user types in the search input
        filterSearch.addEventListener('input', event => {
            const searchValue = event.target.value.toLowerCase();
            filterTags.querySelectorAll('li').forEach(tag => {
                const tagText = tag.textContent.toLowerCase();
                if (tagText.includes(searchValue)) {
                    tag.classList.remove('hidden');
                } else {
                   
                }
            });
        });

        // Change the background color of the tag and add a cross icon when it is clicked
        filterTags.addEventListener('click', event => {
            if (event.target.tagName === 'LI') {
                const tagElement = event.target;
                const tagText = tagElement.textContent.trim();
                const category = filterContainer.querySelector('.filter-button').textContent.toLowerCase();

                // Check if the tag is already selected
                if (tagElement.classList.contains('selected')) {
                    // Deselect the tag
                    tagElement.classList.remove('selected');
                    const crossInTag = tagElement.querySelector('.cross');
                    if (crossInTag)
                        crossInTag.remove();

                    // Remove the tag from the selected tags section
                    const selectedTagSection = document.querySelector(`.tag_${category} .tag.selected`);
                    if (selectedTagSection && selectedTagSection.textContent.trim() === tagText) {
                        selectedTagSection.remove();
                    }
                } else {
                    // Select the tag
                    tagElement.classList.add('selected');
                    tagElement.innerHTML += ' <img src="../assets/utils/cross.svg" alt="cross" class="cross">';

                    // Add the tag to the selected tags section
                    addSelectedTagToSection(tagText, category);
                }

                // Filter the recipes and update the filter tags
                const filteredRecipes = filterRecipesByTags();
                updateFilterTags(filteredRecipes);
                displayCards(filteredRecipes);

                // Remove all other tags that do not match the filtered recipes
                const allTags = Array.from(document.querySelectorAll('.tag'));
                allTags.forEach(tag => {
                    const tagText = tag.textContent.trim();
                    if (!filteredRecipes.some(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient).includes(tagText) || recipe.appliance === tagText || recipe.ustensils.includes(tagText))) {
                        tag.remove();
                    }
                });
            }
        });
    });
}
