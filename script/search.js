export function search(query) {
}

/*
Début
|
|--> Initialiser results = []
|
|--> Pour chaque recette dans recipes :
|     |
|     |--> Si recette.title contient query OU recette.ingredients contient query OU recette.description contient query :
|     |     |
|     |     |--> Ajouter recette à results
|     |
|     |--> Fin Si
|
|--> Fin Pour
|
|--> Retourner results
|
Fin
*/
export function search(query, recipes) {
    let results = [];
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].title.includes(query) || recipes[i].ingredients.includes(query) || recipes[i].description.includes(query)) {
            results.push(recipes[i]);
        }
    }
    return results;
}

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
