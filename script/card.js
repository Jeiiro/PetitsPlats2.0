export function displayCards(searchResults) {
    searchResults.forEach((recipe) => {
        recipe.ingredients.forEach(ingredient => {
                ingredient.ingredient = ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1);
            }
        );
        const card = document.createElement('div');
        card.classList.add('card', 'bg-white', 'rounded-3xl', 'w-[380px]', 'h-[731px]', 'm-4');
        card.innerHTML = `
            <div class="card-image object-fill rounded-tl-3xl rounded-tr-3xl w-[380px] h-[253px] relative">
                <img src="../assets/recette/${recipe.image}" alt="${recipe.name}" class="w-full h-full object-cover rounded-tl-3xl rounded-tr-3xl">
                <div class="absolute top-[26px] right-[20px] time">${recipe.time} min</div>
            </div>
            <div class="card-content mx-5">
                <h2 class="mt-8 font-anton mb-7">${recipe.name}</h2>
                <p class="sous_titre mb-4">RECETTE</p>
                <p class="line-clamp-4 description">${recipe.description}</p>
                <p class="sous_titre mb-4">Ingrédients</p>
                <div class="grid grid-cols-2 gap-4">
                    ${recipe.ingredients.map(ingredients => `<div><p>${ingredients.ingredient}</p><p class="ingredient_quantity">${ingredients.quantity || ''} ${ingredients.unit || ''}</p></div>`).join('')}
                </div>
            </div>
        `;
        document.getElementById('results').appendChild(card);
    });
}
