import {recipes} from "../data/recipes.js";
import {displayCards} from "./card.js";

// attache un écouteur d'événements à un élément de liste (li)
function attachClickListener(li, ul, selectedUl, category, data) {
    // Si un écouteur d'événements a déjà été attaché, on ne fait rien
    if (li.listenerAttached) {
        return;
    }

    // Marquer l'élément de liste comme ayant un écouteur d'événements attaché
    li.listenerAttached = true;

    //  filtre les recettes en fonction des tags sélectionnés
    function filterRecipesByTags(data, category, selectedFilter) {
        // Initialiser les recettes filtrées avec toutes les recettes
        let filteredRecipes = recipes;
        // Parcourir tous les filtres sélectionnés
        selectedFilter.forEach(selectedFilter => {
            // Normaliser le texte du filtre
            let normalizedFilter = selectedFilter.toLowerCase().trim();
            normalizedFilter = normalizedFilter.charAt(0).toUpperCase() + normalizedFilter.slice(1);

            // Filtrer les recettes en fonction de la catégorie
            if (category === 'ingredients') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.ingredients.some(ingredient => ingredient.ingredient === normalizedFilter);
                });
            } else if (category === 'appareils') {
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.appliance === normalizedFilter;
                });
            } else if (category === 'ustensiles') {
                // toLowerCase() pour rendre la recherche insensible à la casse
                let normalizedFilter = selectedFilter.toLowerCase().trim();
                filteredRecipes = filteredRecipes.filter(recipe => {
                    return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === normalizedFilter);
                });
            }
        });

        // Initialiser les listes d'ingrédients, d'appareils et d'ustensiles
        let ingredients = [];
        let appareils = [];
        let ustensiles = [];

        // Parcourir toutes les recettes filtrées
        filteredRecipes.forEach((recipe) => {
            // Ajouter tous les ingrédients de la recette à la liste des ingrédients
            recipe.ingredients.forEach(ingredient => {
                ingredients.push(capitaliseFirstLetter(ingredient.ingredient));
            });
            // Ajouter l'appareil de la recette à la liste des appareils
            appareils.push(capitaliseFirstLetter(recipe.appliance));
            // Ajouter tous les ustensiles de la recette à la liste des ustensiles
            ustensiles.push(...recipe.ustensils.map(ustensil => capitaliseFirstLetter(ustensil)));
        });

        // Supprimer les doublons et trier les listes
        ingredients = [...new Set(ingredients)].sort();
        appareils = [...new Set(appareils)].sort();
        ustensiles = [...new Set(ustensiles)].sort();

        // Exclure les tags sélectionnés des listes
        ingredients = ingredients.filter(tag => !selectedFilter.includes(tag));
        appareils = appareils.filter(tag => !selectedFilter.includes(tag));
        ustensiles = ustensiles.filter(tag => !selectedFilter.includes(tag));

        // Préparer les données pour le filtre
        const datafiltre = {
            ingredients:[...new Set(ingredients)].sort(),
            appareils: [...new Set(appareils)].sort(),
            ustensiles: [...new Set(ustensiles)].sort()
        };

        // Mettre à jour les tags du filtre pour chaque catégorie
        const categories = ['ingredients', 'appareils', 'ustensiles'];
        categories.forEach(category => {
            const ul = document.querySelector(`.filter_tags_${category}`);
            const selectedUl = document.querySelector(`.selected_filter_tags_${category}`);
            ul.innerHTML = ''; // Effacer le ul

            // Ajouter un nouvel élément de liste pour chaque tag
            datafiltre[category].forEach(tag => {
                const li = document.createElement('li');
                li.textContent = tag;
                li.classList.add('tag');
                ul.appendChild(li);
                attachClickListener(li, ul, selectedUl, category, datafiltre);
            });
        });

        // Afficher les cartes des recettes filtrées
        displayCards(filteredRecipes);
        return filteredRecipes;
    }

    // Attacher un écouteur d'événements 'click' à l'élément de liste
    li.addEventListener('click', (event) => {
        // Si l'élément de liste est déjà sélectionné
        if (event.target.classList.contains('selected')) {
            // Supprimer la classe 'selected' de l'élément de liste
            event.target.classList.remove('selected');
            // Supprimer l'élément de liste de la liste permanente
            const permanentUl = document.querySelector(`.permanent_filter_tags_${category}`);
            const permanentLi = [...permanentUl.children].find(child => child.textContent === event.target.textContent);
            if (permanentLi) {
                permanentLi.remove();
            }
            const selectedLi = [...selectedUl.children].find(child => child.textContent === event.target.textContent);
            if (selectedLi) {
                selectedLi.remove();
            }

            // Trouver l'index correct pour insérer l'élément de liste
            const index = [...ul.children].findIndex(child => child.textContent.localeCompare(event.target.textContent) > 0);
            if (index === -1) {
                // Si aucun index n'est trouvé, ajouter l'élément de liste à la fin
                ul.appendChild(event.target);
            } else {
                // Sinon, insérer l'élément de liste avant l'élément à l'index trouvé
                ul.insertBefore(event.target, ul.children[index]);
            }

            // Réattacher l'écouteur de clic
            attachClickListener(event.target, ul, selectedUl, category, data);
            // Mettre à jour les recettes filtrées
            const selectedFilter = [...selectedUl.children].map(li => li.textContent);
            filterRecipesByTags(data, category, selectedFilter);
        } else {
            // Ajouter la classe 'selected' à l'élément de liste cliqué
            event.target.classList.add('selected');

            // Cloner l'élément de liste et ajouter une image de croix
            let selectedLi = event.target.cloneNode(true);
            let crossImg = document.createElement('img');
            crossImg.src = './assets/utils/cross.svg';
            crossImg.classList.add('cross_selected');
            selectedUl.appendChild(selectedLi);
            selectedLi.appendChild(crossImg);

            // Cloner l'élément de liste et ajouter une image de croix pour le tag permanent
            let permanentLi = event.target.cloneNode(true);
            let crossTagImg = document.createElement('img');
            crossTagImg.src = './assets/utils/cross_tag.svg';
            crossTagImg.classList.add('cross_tag');
            const permanentUl = document.querySelector(`.permanent_filter_tags_${category}`);

            // Vérifier si un élément de liste avec le même contenu existe déjà dans permanentLi
            const existingLi = [...permanentUl.children].find(child => child.textContent === permanentLi.textContent);
            if (!existingLi) {
                // Si aucun élément de liste n'existe, ajouter le nouvel élément de liste à permanentLi
                permanentUl.appendChild(permanentLi);
                permanentLi.appendChild(crossTagImg);
            }
            // Attacher un écouteur d'événements 'click' à l'élément de liste permanent
            permanentLi.addEventListener('click', () => {
                permanentLi.remove();
                selectedLi.remove();
                li.click();
            });
            // Attacher un écouteur d'événements 'click' à l'élément de liste sélectionné
            selectedLi.addEventListener('click', () => {
                selectedLi.remove();
                // Déclencher l'événement de clic sur l'élément de liste original pour le ramener à la liste originale
                li.click();
            });

            // Supprimer l'élément de liste de la liste originale
            event.target.remove();

            // Mettre à jour les recettes filtrées
            const selectedFilter = [...selectedUl.children].map(li => li.textContent);
            const filteredRecipes = filterRecipesByTags(data, category, selectedFilter);


            ul.innerHTML = ''; // vide le ul
            let tags = [];
            // Parcourir toutes les recettes filtrées pour obtenir les tags selon la catégorie
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

            // Supprimer les doublons et trier les tags
            tags = [...new Set(tags)].sort();

            // Exclure les tags sélectionnés des tags
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

    // Attacher un écouteur d'événements 'click' à l'élément de liste permanent
    // pour déclencher l'événement de clic sur l'élément de liste original
    // pour le ramener à la liste originale
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
// Fermer le dropdown si on clique en dehors
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

// Mettre à jour les tags du filtre
export function updateFilterTags() {
    // Initialiser les listes d'ingrédients, d'appareils et d'ustensiles
    let ingredients = [];
    let appareils = [];
    let ustensiles = [];

    // Parcourir toutes les recettes
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient => {
            // Normaliser le texte de l'ingrédient
            let normalizedIngredient = ingredient.ingredient.toLowerCase().trim();
            normalizedIngredient = normalizedIngredient.charAt(0).toUpperCase() + normalizedIngredient.slice(1);
            // Supprimer le 's' à la fin de l'ingrédient
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

    // Supprimer les doublons et trier les listes
    ingredients = [...new Set(ingredients)].sort();
    appareils = [...new Set(appareils)].sort();
    ustensiles = [...new Set(ustensiles)].sort();

    // Préparer les données pour le filtre
    const categories = ['ingredients', 'appareils', 'ustensiles'];
    const data = {ingredients, appareils, ustensiles};

    // Mettre à jour les tags du filtre pour chaque catégorie
    categories.forEach(category => {
        const ul = document.querySelector(`.filter_tags_${category}`);
        const selectedUl = document.querySelector(`.selected_filter_tags_${category}`);
        ul.innerHTML = ''; // Effacer le ul

        data[category].forEach(tag => {
            const li = document.createElement('li');
            li.textContent =  capitaliseFirstLetter(tag);
            li.classList.add('tag');
            ul.appendChild(li);

            attachClickListener(li, ul, selectedUl, category, data);
        });

    });

}
// Gérer les filtres
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
                    //flerche vers le haut
                    arrowImg.setAttribute('src', './assets/utils/ArrowUp.svg');
                } else {
                    button.style.borderRadius = '11px';
                    dropdown.style.zIndex = '-1';
                    //flerche vers le bas
                    arrowImg.setAttribute("src", "./assets/utils/ArrowDown.svg");
                }
            });
        }
    )

    // Gérer la recherche dans les filtres
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
