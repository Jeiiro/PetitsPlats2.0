export function applyFilters(searchResults) {
    // Ajoutez votre logique de filtrage ici
    // Par exemple, pour filtrer les recettes qui ont plus de 5 ingrédients :
    return searchResults.filter(recipe => recipe.ingredients.length > 5);
}
