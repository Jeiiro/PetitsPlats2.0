export class recipeCard {
  constructor(recipeObject) {
    const { name, ingredients, servings, image, id, time, description } =
      recipeObject;
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.servings = servings;
    this.image = image;
    this.time = time;
    this.description = description;
  }
  getArticleDOM() {
    const article = document.createElement("article");
    article.setAttribute("class", "card col-md-4");

    article.innerHTML = `
    <span class="badge badge-pill badge-warning card-time">${this.time} min</span> 
    <img src="/assets/images/PhotosP7JSLespetitsplats/${this.image}" class="card-img-top" alt="image">
     
      <div class="card-body">
        <h5 class="card-title">${this.name}</h5>
        <div class="recipe_container">
          <h6 class="card-subtitle mb-2 text-body-secondary">RECETTE</h6>
          <p class="card-text">${this.description}</p>
        </div>

        <div class="ingredints_container">
          <h6 class="card-subtitle mb-2 text-body-secondary">INGRÉDIENTS</h6>
          <div class="container">
            <div id="ingredient_container${this.id}" class="row custom-row-gap">
            </div>
          </div>
        </div>
      </div>
    `;

    return article;
  }

  ingredientList() {
    this.ingredients.forEach((element) => {
      const ingredient = element.ingredient;
      const quantity = element.quantity;
      const unit = element.unit;

      const ingredientContainer = document.getElementById(
        `ingredient_container${this.id}`
      );

      if (!ingredientContainer) return;

      ingredientContainer.innerHTML += `<div class="col-md-5 ingredient_item">
                  <span>${ingredient}</span>
                  <i>${quantity} ${unit ?? ""}</i>
                </div>`;
    });
  }
}
