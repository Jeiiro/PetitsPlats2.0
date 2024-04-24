export async function getRecipes() {
  const response = await fetch("./data/recipes.js");

  if (!response.ok) {
    throw new Error(`Erreur de chargement des recettes : ${response.status}`);
  }

  const recipes = await response.text();

  return { recipes };
}
