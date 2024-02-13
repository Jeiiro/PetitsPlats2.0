import {search} from './search.js';
import {applyFilters} from './filter.js';
import {displayCards} from './card.js';
import {recipes} from '../data/recipes.js';

document.addEventListener('DOMContentLoaded', () => {
    displayCards(recipes)
});
const searchInput = document.getElementById('search');

let searchResults;
// add event listener for the search input
searchInput.addEventListener('input', (event) => {
    searchResults = search(event.target.value, recipes);
    console.log(searchResults);
    if (searchResults.length > 0) {
        const filteredResults = applyFilters(searchResults);
        console.log(filteredResults);
        // Clear previous results
        document.getElementById('results').innerHTML = '';
        // Display new results
        displayCards(filteredResults);
    } else {
        // Clear previous results if no search results
        document.getElementById('results').innerHTML = '';
    }
});
document.querySelectorAll('.filter-container').forEach(filterContainer => {
    const filterButton = filterContainer.querySelector('.filter-button');
    const filterDropdown = filterContainer.querySelector('.filter-dropdown');
    const filterSearch = filterContainer.querySelector('.filter-search');
    const filterTags = filterContainer.querySelector('.filter-tags');

    // Toggle the visibility of the dropdown when the filter button is clicked
    filterButton.addEventListener('click', () => {
        filterDropdown.classList.toggle('hidden');
    });

    // Filter the tags when the user types in the search input
    filterSearch.addEventListener('input', event => {
        const searchValue = event.target.value.toLowerCase();
        filterTags.querySelectorAll('li').forEach(tag => {
            const tagText = tag.textContent.toLowerCase();
            if (tagText.includes(searchValue)) {
                tag.classList.remove('hidden');
            } else {
                tag.classList.add('hidden');
            }
        });
    });

    // Change the background color of the tag and add a cross icon when it is clicked
    filterTags.addEventListener('click', event => {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('selected');
            if (event.target.classList.contains('selected')) {
                event.target.innerHTML += ' <span class="cross-icon">x</span>';
            } else {
                event.target.innerHTML = event.target.textContent.trim();
            }
        }
    });
});
