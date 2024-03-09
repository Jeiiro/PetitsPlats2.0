export function initFilters(recipes) {
    const ingredientFilter = document.querySelector('#ingredient');
    const applianceFilter = document.querySelector('#appliance');
    const utensilFilter = document.querySelector('#utensil');

    ingredientFilter.addEventListener('input', (event) => {
        filterByIngredient(recipes, event.target.value);
    });
    applianceFilter.addEventListener('input', (event) => {
        filterByAppliance(recipes, event.target.value);
    });
    utensilFilter.addEventListener('input', (event) => {
        filterByUtensil(recipes, event.target.value);
    });
}

function filterByIngredient(recipes, ingredient) {
    console.log("Recipes: ", recipes);
    console.log("Ingredient: ", ingredient);
    console.log("Filter: ", filterArrayByCondition(recipes, recipe => recipe.ingredients.includes(ingredient)));
    return filterArrayByCondition(recipes, recipe => recipe.ingredients.includes(ingredient));
}

function filterByAppliance(recipes, appliance) {
    return filterArrayByCondition(recipes, recipe => recipe.appliances.includes(appliance));
}

function filterByUtensil(recipes, utensil) {
    return filterArrayByCondition(recipes, recipe => recipe.utensils.includes(utensil));
}
