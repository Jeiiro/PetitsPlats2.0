import { search } from './search.js';
import { applyFilters } from './filter.js';
import { displayCards } from './card.js';

const searchInput = document.getElementById('search');

// add event listener pour le champ de recherche
searchInput.addEventListener('input', (event) => {
    // faire une recherche
        const searchResults = search(event.target.value);
        console.log(searchResults);
// appliquer les filtres
        const filteredResults = applyFilters(searchResults);
        console.log(filteredResults);
// afficher les résultats
        displayCards(filteredResults);
    }
);
