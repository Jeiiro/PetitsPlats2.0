import {handleSearch} from './search.js';
import {filterRecipesByTags, handleFilters, updateFilterTags} from './filter.js'; // Add filterRecipesByTags here
import {displayCards} from './card.js';
import {recipes} from '../data/recipes.js';

document.addEventListener('DOMContentLoaded', () => {
        displayCards(recipes);
        handleSearch();
        handleFilters();
        updateFilterTags(filterRecipesByTags()); 
});
