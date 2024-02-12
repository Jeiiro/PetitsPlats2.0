/*
Début
|
|--> Retourner recipes.filter(recette => recette.title contient query OU recette.ingredients contient query OU recette.description contient query)
|
Fin

 */

export function search(query, recipes) {
    return recipes.filter(recipe => recipe.title.includes(query) || recipe.ingredients.includes(query) || recipe.description.includes(query));
}
